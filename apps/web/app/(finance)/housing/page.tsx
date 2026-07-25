"use client";

import { Button } from "@oss/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@oss/ui/components/card";
import { Input } from "@oss/ui/components/input";
import { Label } from "@oss/ui/components/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@oss/ui/components/select";
import { ToggleGroup, ToggleGroupItem } from "@oss/ui/components/toggle-group";
import { useMemo, useState } from "react";
import {
	calculateTrueCostOfOwnership,
	DEFAULT_HOUSING_COST_INPUTS,
	type HousingCostInputs,
} from "./cost";
import PROPERTY_TAX_RATES_USA from "./property-tax-rates-usa";

const usdFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
	style: "percent",
	maximumFractionDigits: 2,
});

function parseInput(value: string, fallback: number) {
	if (value === "") {
		return 0;
	}

	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

function percentageToDecimal(value: string, fallback: number) {
	return parseInput(value, fallback * 100) / 100;
}

function decimalToPercentage(value: number) {
	return Number((value * 100).toFixed(4));
}

export default function Page() {
	const [inputs, setInputs] = useState<HousingCostInputs>(
		DEFAULT_HOUSING_COST_INPUTS
	);
	const [clearedInputs, setClearedInputs] = useState<
		Set<keyof HousingCostInputs>
	>(() => new Set());
	const [selectedState, setSelectedState] = useState<string | null>(null);
	const [costPeriod, setCostPeriod] = useState<"monthly" | "yearly">("monthly");

	const result = useMemo(() => calculateTrueCostOfOwnership(inputs), [inputs]);
	const opportunityCostRate = result.OPPORTUNITY_COST_RATE;
	const periodDivisor = costPeriod === "monthly" ? 12 : 1;

	function updateInput<K extends keyof HousingCostInputs>(
		key: K,
		value: string
	) {
		setClearedInputs((current) => {
			const next = new Set(current);
			if (value === "") {
				next.add(key);
			} else {
				next.delete(key);
			}
			return next;
		});
		setInputs((current) => ({
			...current,
			[key]: parseInput(value, current[key]),
		}));
	}

	function updatePercentageInput<
		K extends Exclude<keyof HousingCostInputs, "housePrice">,
	>(key: K, value: string) {
		setClearedInputs((current) => {
			const next = new Set(current);
			if (value === "") {
				next.add(key);
			} else {
				next.delete(key);
			}
			return next;
		});
		setInputs((current) => ({
			...current,
			[key]: percentageToDecimal(value, current[key]),
		}));
	}

	function displayInput<K extends keyof HousingCostInputs>(
		key: K,
		value: number
	) {
		return clearedInputs.has(key) ? "" : value;
	}

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6 sm:p-10">
			<Card>
				<CardHeader>
					<CardTitle>Housing Cost Calculator</CardTitle>
					<CardDescription>
						Calculate true cost of ownership for a house using tax, maintenance
						cost, down payment, opportunity cost, and mortgage cost assumptions.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-2">
					<div>
						<Label htmlFor="housePrice">House price</Label>
						<Input
							className="font-mono"
							id="housePrice"
							min={0}
							onChange={(event) =>
								updateInput("housePrice", event.target.value)
							}
							step="1000"
							type="number"
							value={displayInput("housePrice", inputs.housePrice)}
						/>
					</div>

					<div>
						<Label htmlFor="stateTaxPreset">State tax preset</Label>
						<Select
							onValueChange={(state) => {
								if (!state) {
									return;
								}

								setSelectedState(state);
								setInputs((current) => ({
									...current,
									taxRate:
										PROPERTY_TAX_RATES_USA[
											state as keyof typeof PROPERTY_TAX_RATES_USA
										].rate,
								}));
								setClearedInputs((current) => {
									const next = new Set(current);
									next.delete("taxRate");
									return next;
								});
							}}
							value={selectedState}
						>
							<SelectTrigger className="w-full" id="stateTaxPreset">
								<SelectValue placeholder="Choose a state" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(PROPERTY_TAX_RATES_USA).map(
									([code, { name, rate }]) => (
										<SelectItem key={code} value={code}>
											{name} ({decimalToPercentage(rate)}%)
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="taxRate">Tax rate (%)</Label>
						<Input
							className="font-mono"
							id="taxRate"
							min={0}
							onChange={(event) =>
								updatePercentageInput("taxRate", event.target.value)
							}
							step="0.1"
							type="number"
							value={displayInput(
								"taxRate",
								decimalToPercentage(inputs.taxRate)
							)}
						/>
					</div>

					<div>
						<Label htmlFor="repairRate">Repair rate (%)</Label>
						<Input
							className="font-mono"
							id="repairRate"
							min={0}
							onChange={(event) =>
								updatePercentageInput("repairRate", event.target.value)
							}
							step="0.1"
							type="number"
							value={displayInput(
								"repairRate",
								decimalToPercentage(inputs.repairRate)
							)}
						/>
					</div>

					<div>
						<Label htmlFor="downPaymentRate">Down payment (%)</Label>
						<Input
							className="font-mono"
							id="downPaymentRate"
							max={100}
							min={0}
							onChange={(event) =>
								updatePercentageInput("downPaymentRate", event.target.value)
							}
							step="0.1"
							type="number"
							value={displayInput(
								"downPaymentRate",
								decimalToPercentage(inputs.downPaymentRate)
							)}
						/>
					</div>

					<div>
						<Label htmlFor="sp500ReturnRate">S&P 500 return (%)</Label>
						<Input
							className="font-mono"
							id="sp500ReturnRate"
							min={0}
							onChange={(event) =>
								updatePercentageInput("sp500ReturnRate", event.target.value)
							}
							step="0.1"
							type="number"
							value={displayInput(
								"sp500ReturnRate",
								decimalToPercentage(inputs.sp500ReturnRate)
							)}
						/>
					</div>

					<div>
						<Label htmlFor="homeAppreciationRate">Home appreciation (%)</Label>
						<Input
							className="font-mono"
							id="homeAppreciationRate"
							min={0}
							onChange={(event) =>
								updatePercentageInput(
									"homeAppreciationRate",
									event.target.value
								)
							}
							step="0.1"
							type="number"
							value={displayInput(
								"homeAppreciationRate",
								decimalToPercentage(inputs.homeAppreciationRate)
							)}
						/>
					</div>

					<div>
						<Label htmlFor="mortgageRate">Mortgage rate (%)</Label>
						<Input
							className="font-mono"
							id="mortgageRate"
							min={0}
							onChange={(event) =>
								updatePercentageInput("mortgageRate", event.target.value)
							}
							step="0.1"
							type="number"
							value={displayInput(
								"mortgageRate",
								decimalToPercentage(inputs.mortgageRate)
							)}
						/>
					</div>

					<div className="sm:col-span-2">
						<Button
							onClick={() => {
								setInputs(DEFAULT_HOUSING_COST_INPUTS);
								setClearedInputs(new Set());
							}}
							variant="outline"
						>
							Reset to defaults
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex-row items-center justify-between gap-4">
					<div className="flex w-full items-center justify-between gap-4">
						<CardTitle>Results</CardTitle>
						<ToggleGroup
							aria-label="Cost period"
							onValueChange={(value) => {
								const period = value[0];
								if (period === "monthly" || period === "yearly") {
									setCostPeriod(period);
								}
							}}
							value={[costPeriod]}
							variant="outline"
						>
							<ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
							<ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 text-sm">
					<div className="mx-auto w-full max-w-xl">
						<div className="space-y-2">
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">Property tax</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.TAX / periodDivisor)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">Repairs and maintenance</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.REPAIR_COST / periodDivisor)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">Opportunity cost</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.OPPORTUNITY_COST / periodDivisor)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">Mortgage cost</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.COST_OF_DEBT / periodDivisor)}
								</p>
							</div>
						</div>

						<div className="mt-4 border-foreground/25 border-t-2 border-dashed pt-3">
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="font-medium text-base">Total {costPeriod} cost</p>
								<p className="font-bold font-mono text-lg tabular-nums">
									{usdFormatter.format(
										result.TRUE_COST_OF_OWNERSHIP / periodDivisor
									)}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<article className="mx-auto w-full max-w-3xl space-y-6 py-4 text-sm leading-6">
				<header className="space-y-2">
					<h2 className="font-semibold text-2xl">How the cost is calculated</h2>
				</header>

				<section className="space-y-3">
					<h3 className="font-semibold text-base">Values used</h3>
					<dl className="space-y-1 text-muted-foreground">
						<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
							<dt>House price</dt>
							<dd className="font-mono">
								P = {usdFormatter.format(inputs.housePrice)}
							</dd>
						</div>
						<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
							<dt>Property tax rate</dt>
							<dd className="font-mono">
								t = {percentFormatter.format(inputs.taxRate)}
							</dd>
						</div>
						<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
							<dt>Repair rate</dt>
							<dd className="font-mono">
								r = {percentFormatter.format(inputs.repairRate)}
							</dd>
						</div>
						<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
							<dt>Down payment rate</dt>
							<dd className="font-mono">
								i = {percentFormatter.format(inputs.downPaymentRate)}
							</dd>
						</div>
						<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
							<dt>Opportunity cost rate</dt>
							<dd className="font-mono">
								y = {percentFormatter.format(opportunityCostRate)}
							</dd>
						</div>
						<div className="ml-4 space-y-1 border-muted border-l pl-4">
							<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
								<dt>S&P 500 average return</dt>
								<dd className="font-mono">
									q = {percentFormatter.format(inputs.sp500ReturnRate)}
								</dd>
							</div>
							<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
								<dt>Median home appreciation</dt>
								<dd className="font-mono">
									a = {percentFormatter.format(inputs.homeAppreciationRate)}
								</dd>
							</div>
							<p className="font-mono">
								y = q - a = {percentFormatter.format(inputs.sp500ReturnRate)} -{" "}
								{percentFormatter.format(inputs.homeAppreciationRate)} ={" "}
								{percentFormatter.format(opportunityCostRate)}
							</p>
						</div>
						<div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
							<dt>Mortgage rate</dt>
							<dd className="font-mono">
								d = {percentFormatter.format(inputs.mortgageRate)}
							</dd>
						</div>
					</dl>
				</section>

				<section className="space-y-4">
					<h3 className="font-semibold text-base">Step-by-step calculation</h3>
					<ol className="space-y-4 text-muted-foreground">
						<li>
							<p>
								<strong className="text-foreground">
									<span className="font-mono">1.</span> Property tax
								</strong>
							</p>
							<p>
								<span className="font-mono">
									T = t x P = {percentFormatter.format(inputs.taxRate)} x{" "}
									{usdFormatter.format(inputs.housePrice)} ={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(result.TAX)}
									</strong>
								</span>{" "}
								per year.
							</p>
						</li>
						<li>
							<p>
								<strong className="text-foreground">
									<span className="font-mono">2.</span> Repairs and maintenance
								</strong>
							</p>
							<p>
								<span className="font-mono">
									R = r x P = {percentFormatter.format(inputs.repairRate)} x{" "}
									{usdFormatter.format(inputs.housePrice)} ={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(result.REPAIR_COST)}
									</strong>
								</span>{" "}
								per year.
							</p>
						</li>
						<li>
							<p>
								<strong className="text-foreground">
									<span className="font-mono">3.</span> Down payment
								</strong>
							</p>
							<p>
								<span className="font-mono">
									I = i x P = {percentFormatter.format(inputs.downPaymentRate)}{" "}
									x {usdFormatter.format(inputs.housePrice)} ={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(result.DOWN_PAYMENT)}
									</strong>
								</span>
								.
							</p>
						</li>
						<li>
							<p>
								<strong className="text-foreground">
									<span className="font-mono">4.</span> Opportunity cost
								</strong>
							</p>
							<p>
								<span className="font-mono">
									Y = y x I = {percentFormatter.format(opportunityCostRate)} x{" "}
									{usdFormatter.format(result.DOWN_PAYMENT)} ={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(result.OPPORTUNITY_COST)}
									</strong>
								</span>{" "}
								per year.
							</p>
						</li>
						<li>
							<p>
								<strong className="text-foreground">
									<span className="font-mono">5.</span> Mortgage cost
								</strong>
							</p>
							<p>
								The financed balance is{" "}
								<span className="font-mono">
									P - I: {usdFormatter.format(inputs.housePrice)} -{" "}
									{usdFormatter.format(result.DOWN_PAYMENT)} ={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(
											inputs.housePrice - result.DOWN_PAYMENT
										)}
									</strong>
								</span>{" "}
								.
							</p>
							<p>
								<span className="font-mono">
									D = d x (P - I) ={" "}
									{percentFormatter.format(inputs.mortgageRate)} x{" "}
									{usdFormatter.format(inputs.housePrice - result.DOWN_PAYMENT)}{" "}
									={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(result.COST_OF_DEBT)}
									</strong>
								</span>{" "}
								per year.
							</p>
						</li>
						<li>
							<p>
								<strong className="text-foreground">
									<span className="font-mono">6.</span> Total yearly cost
								</strong>
							</p>
							<p>
								<span className="font-mono">
									K = T + R + Y + D = {usdFormatter.format(result.TAX)} +{" "}
									{usdFormatter.format(result.REPAIR_COST)} +{" "}
									{usdFormatter.format(result.OPPORTUNITY_COST)} +{" "}
									{usdFormatter.format(result.COST_OF_DEBT)} ={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(result.TRUE_COST_OF_OWNERSHIP)}
									</strong>
								</span>{" "}
								per year.
							</p>
						</li>
						<li>
							<p>
								<strong className="text-foreground">
									<span className="font-mono">7.</span> Total monthly cost
								</strong>
							</p>
							<p>
								<span className="font-mono">
									N = K ÷ 12 ={" "}
									{usdFormatter.format(result.TRUE_COST_OF_OWNERSHIP)} ÷ 12 ={" "}
									<strong className="text-foreground tabular-nums">
										{usdFormatter.format(result.MONTHLY_COST_OF_OWNERSHIP)}
									</strong>
								</span>{" "}
								per month.
							</p>
						</li>
					</ol>
				</section>
			</article>
		</div>
	);
}
