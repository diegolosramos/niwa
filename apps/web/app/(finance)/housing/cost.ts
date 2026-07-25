export type HousingCostInputs = {
	housePrice: number;
	taxRate: number;
	repairRate: number;
	downPaymentRate: number;
	sp500ReturnRate: number;
	homeAppreciationRate: number;
	mortgageRate: number;
};

export const DEFAULT_HOUSING_COST_INPUTS: HousingCostInputs = {
	housePrice: 400_000,
	taxRate: 0.011,
	repairRate: 0.01,
	downPaymentRate: 0.2,
	sp500ReturnRate: 0.1,
	homeAppreciationRate: 0.05,
	mortgageRate: 0.07,
};

export function calculateTrueCostOfOwnership(inputs: HousingCostInputs) {
	const TAX = inputs.housePrice * inputs.taxRate;
	const REPAIR_COST = inputs.housePrice * inputs.repairRate;
	const DOWN_PAYMENT = inputs.housePrice * inputs.downPaymentRate;
	const OPPORTUNITY_COST_RATE =
		inputs.sp500ReturnRate - inputs.homeAppreciationRate;
	const OPPORTUNITY_COST = DOWN_PAYMENT * OPPORTUNITY_COST_RATE;
	const COST_OF_DEBT = (inputs.housePrice - DOWN_PAYMENT) * inputs.mortgageRate;

	const TRUE_COST_OF_OWNERSHIP =
		TAX + REPAIR_COST + OPPORTUNITY_COST + COST_OF_DEBT;

	return {
		TAX,
		REPAIR_COST,
		DOWN_PAYMENT,
		OPPORTUNITY_COST_RATE,
		OPPORTUNITY_COST,
		COST_OF_DEBT,
		TRUE_COST_OF_OWNERSHIP,
		MONTHLY_COST_OF_OWNERSHIP: TRUE_COST_OF_OWNERSHIP / 12,
	};
}
