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

export default function Page() {
	const [inputs, setInputs] = useState<HousingCostInputs>(
		DEFAULT_HOUSING_COST_INPUTS
	);

	const result = useMemo(() => calculateTrueCostOfOwnership(inputs), [inputs]);
	const financedShare = 1 - inputs.downPaymentRate;

	function updateInput<K extends keyof HousingCostInputs>(
		key: K,
		value: string
	) {
		setInputs((current) => ({
			...current,
			[key]: parseInput(value, current[key]),
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
						<Label htmlFor="taxRate">Tax rate (decimal)</Label>
						<Input
							id="taxRate"
							min={0}
							onChange={(event) => updateInput("taxRate", event.target.value)}
							step="0.001"
							type="number"
							value={inputs.taxRate}
						/>
					</div>

					<div>
						<Label htmlFor="repairRate">Repair rate (decimal)</Label>
						<Input
							id="repairRate"
							min={0}
							onChange={(event) =>
								updateInput("repairRate", event.target.value)
							}
							step="0.001"
							type="number"
							value={inputs.repairRate}
						/>
					</div>

					<div>
						<Label htmlFor="downPaymentRate">Down payment rate (decimal)</Label>
						<Input
							id="downPaymentRate"
							max={1}
							min={0}
							onChange={(event) =>
								updateInput("downPaymentRate", event.target.value)
							}
							step="0.01"
							type="number"
							value={inputs.downPaymentRate}
						/>
					</div>

					<div>
						<Label htmlFor="opportunityCostRate">
							Opportunity cost rate (decimal)
						</Label>
						<Input
							id="opportunityCostRate"
							min={0}
							onChange={(event) =>
								updateInput("opportunityCostRate", event.target.value)
							}
							step="0.001"
							type="number"
							value={inputs.opportunityCostRate}
						/>
					</div>

					<div>
						<Label htmlFor="mortgageRate">Mortgage rate (decimal)</Label>
						<Input
							id="mortgageRate"
							min={0}
							onChange={(event) =>
								updateInput("mortgageRate", event.target.value)
							}
							step="0.001"
							type="number"
							value={inputs.mortgageRate}
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
								<p className="font-semibold tabular-nums">
									{usdFormatter.format(result.TAX)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">
									Repairs and maintenance (
									{percentFormatter.format(inputs.repairRate)})
								</p>
								<p className="font-semibold tabular-nums">
									{usdFormatter.format(result.REPAIR_COST)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">
									Opportunity cost (
									{percentFormatter.format(inputs.opportunityCostRate)} of down
									payment)
								</p>
								<p className="font-semibold tabular-nums">
									{usdFormatter.format(result.OPPORTUNITY_COST)}
								</p>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="text-muted-foreground">
									Mortgage debt cost (
									{percentFormatter.format(inputs.mortgageRate)} on{" "}
									{percentFormatter.format(financedShare)} financed)
								</p>
								<p className="font-semibold tabular-nums">
									{usdFormatter.format(result.COST_OF_DEBT)}
								</p>
							</div>
						</div>

						<div className="mt-4 border-foreground/25 border-t-2 border-dashed pt-3">
							<div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
								<p className="font-medium text-base">
									Total yearly housing cost
								</p>
								<p className="font-bold text-lg tabular-nums">
									{usdFormatter.format(result.TRUE_COST_OF_OWNERSHIP)}
								</p>
							</div>
						</div>
					</div>

					<div className="mx-auto w-full max-w-xl rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 sm:px-6">
						<p className="text-muted-foreground text-xs uppercase tracking-wide">
							Break it into months
						</p>
						<p className="mt-1 font-medium text-base">
							Monthly cost:{" "}
							<span className="font-bold tabular-nums">
								{usdFormatter.format(result.MONTHLY_COST_OF_OWNERSHIP)}
							</span>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
