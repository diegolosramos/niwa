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
import { useMemo, useState } from "react";
import {
	calculateTrueCostOfOwnership,
	DEFAULT_HOUSING_COST_INPUTS,
	type HousingCostInputs,
} from "./cost";

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

	const result = useMemo(() => calculateTrueCostOfOwnership(inputs), [inputs]);
	const financedShare = 1 - inputs.downPaymentRate;
	const opportunityCostRate = result.OPPORTUNITY_COST_RATE;

	function updateInput<K extends keyof HousingCostInputs>(
		key: K,
		value: string
	) {
		setInputs((current) => ({
			...current,
			[key]: parseInput(value, current[key]),
		}));
	}

	function updatePercentageInput<
		K extends Exclude<keyof HousingCostInputs, "housePrice">,
	>(key: K, value: string) {
		setInputs((current) => ({
			...current,
			[key]: percentageToDecimal(value, current[key]),
		}));
	}

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6 sm:p-10">
			<Card>
				<CardHeader>
					<CardTitle>Housing Cost Calculator</CardTitle>
					<CardDescription>
						Calculate true cost of ownership for a house using tax, maintenance
						cost, down payment, opportunity cost, and mortgage debt cost
						assumptions.
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
							value={inputs.housePrice}
						/>
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
							value={decimalToPercentage(inputs.taxRate)}
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
							value={decimalToPercentage(inputs.repairRate)}
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
							value={decimalToPercentage(inputs.downPaymentRate)}
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
							value={decimalToPercentage(inputs.sp500ReturnRate)}
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
							value={decimalToPercentage(inputs.homeAppreciationRate)}
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
							value={decimalToPercentage(inputs.mortgageRate)}
						/>
					</div>

					<div className="sm:col-span-2">
						<Button
							onClick={() => setInputs(DEFAULT_HOUSING_COST_INPUTS)}
							variant="outline"
						>
							Reset to defaults
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Results</CardTitle>
					<CardDescription>
						Think of this like simple adding: yearly costs stack up to make your
						total yearly housing cost.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6 text-sm">
					<div className="mx-auto w-full max-w-xl">
						<div className="space-y-2">
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">
									Property tax ({percentFormatter.format(inputs.taxRate)})
								</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.TAX)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">
									Repairs and maintenance (
									{percentFormatter.format(inputs.repairRate)})
								</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.REPAIR_COST)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">
									Opportunity cost (
									{percentFormatter.format(opportunityCostRate)} of down
									payment)
								</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.OPPORTUNITY_COST)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">
									Mortgage debt cost (
									{percentFormatter.format(inputs.mortgageRate)} on{" "}
									{percentFormatter.format(financedShare)} financed)
								</p>
								<p className="font-mono font-semibold tabular-nums">
									{usdFormatter.format(result.COST_OF_DEBT)}
								</p>
							</div>
						</div>

						<div className="mt-4 border-foreground/25 border-t-2 border-dashed pt-3">
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="font-medium text-base">
									Total yearly housing cost
								</p>
								<p className="font-bold font-mono text-lg tabular-nums">
									{usdFormatter.format(result.TRUE_COST_OF_OWNERSHIP)}
								</p>
							</div>
						</div>
					</div>

					<p className="mt-1 font-medium text-base">
						Monthly cost:{" "}
						<span className="font-bold font-mono tabular-nums">
							{usdFormatter.format(result.MONTHLY_COST_OF_OWNERSHIP)}
						</span>
					</p>
				</CardContent>
			</Card>

			<article className="mx-auto w-full max-w-3xl space-y-6 py-4 text-sm leading-6">
				<header className="space-y-2">
					<h2 className="font-semibold text-2xl">How the cost is calculated</h2>
					<p className="text-muted-foreground">
						The rates in the form are shown as percentages for readability. The
						calculation converts them to decimal multipliers: for example,
						<span className="font-mono">
							{` ${percentFormatter.format(inputs.taxRate)} = ${inputs.taxRate}`}
						</span>
						. Buying a home costs more than the payment you send to the bank, so
						this total includes taxes, maintenance, the return given up on the
						down payment, and mortgage interest.
					</p>
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
								o = {percentFormatter.format(opportunityCostRate)}
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
								o = q - a = {percentFormatter.format(inputs.sp500ReturnRate)} -{" "}
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
					<p className="text-muted-foreground">
						The opportunity cost rate is the difference between the S&P 500
						return (q) and median home appreciation (a).
					</p>
				</section>

				<section className="space-y-4">
					<h3 className="font-semibold text-base">Step-by-step calculation</h3>
					<ol className="space-y-4 text-muted-foreground">
						<li>
							<p className="font-mono">
								<strong className="text-foreground">
									1. Property tax (T = t x P)
								</strong>
							</p>
							<p className="font-mono">
								{percentFormatter.format(inputs.taxRate)} x{" "}
								{usdFormatter.format(inputs.housePrice)} ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(result.TAX)}
								</strong>{" "}
								per year.
							</p>
						</li>
						<li>
							<p className="font-mono">
								<strong className="text-foreground">
									2. Repairs and maintenance (R = r x P)
								</strong>
							</p>
							<p className="font-mono">
								{percentFormatter.format(inputs.repairRate)} x{" "}
								{usdFormatter.format(inputs.housePrice)} ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(result.REPAIR_COST)}
								</strong>{" "}
								per year.
							</p>
						</li>
						<li>
							<p className="font-mono">
								<strong className="text-foreground">
									3. Down payment (I = i x P)
								</strong>
							</p>
							<p className="font-mono">
								{percentFormatter.format(inputs.downPaymentRate)} x{" "}
								{usdFormatter.format(inputs.housePrice)} ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(result.DOWN_PAYMENT)}
								</strong>
								.
							</p>
						</li>
						<li>
							<p className="font-mono">
								<strong className="text-foreground">
									4. Opportunity cost (O = o x I)
								</strong>
							</p>
							<p className="font-mono">
								{percentFormatter.format(opportunityCostRate)} x{" "}
								{usdFormatter.format(result.DOWN_PAYMENT)} ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(result.OPPORTUNITY_COST)}
								</strong>{" "}
								per year.
							</p>
						</li>
						<li>
							<p className="font-mono">
								<strong className="text-foreground">
									5. Mortgage debt cost (D = d x (P - I))
								</strong>
							</p>
							<p className="font-mono">
								The financed balance is P - I:{" "}
								{usdFormatter.format(inputs.housePrice)} -{" "}
								{usdFormatter.format(result.DOWN_PAYMENT)} ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(inputs.housePrice - result.DOWN_PAYMENT)}
								</strong>
								.
							</p>
							<p className="font-mono">
								{percentFormatter.format(inputs.mortgageRate)} x{" "}
								{usdFormatter.format(inputs.housePrice - result.DOWN_PAYMENT)} ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(result.COST_OF_DEBT)}
								</strong>{" "}
								per year.
							</p>
						</li>
						<li>
							<p className="font-mono">
								<strong className="text-foreground">
									6. Total yearly cost (K = T + R + O + D)
								</strong>
							</p>
							<p className="font-mono">
								{usdFormatter.format(result.TAX)} +{" "}
								{usdFormatter.format(result.REPAIR_COST)} +{" "}
								{usdFormatter.format(result.OPPORTUNITY_COST)} +{" "}
								{usdFormatter.format(result.COST_OF_DEBT)} ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(result.TRUE_COST_OF_OWNERSHIP)}
								</strong>{" "}
								per year.
							</p>
						</li>
						<li>
							<p className="font-mono">
								<strong className="text-foreground">
									7. Total monthly cost (N = K ÷ 12)
								</strong>
							</p>
							<p className="font-mono">
								{usdFormatter.format(result.TRUE_COST_OF_OWNERSHIP)} ÷ 12 ={" "}
								<strong className="text-foreground tabular-nums">
									{usdFormatter.format(result.MONTHLY_COST_OF_OWNERSHIP)}
								</strong>{" "}
								per month.
							</p>
						</li>
					</ol>
				</section>
			</article>
		</div>
	);
}
