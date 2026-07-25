const taxRate = 0.011;
const repairRate = 0.01;
const downPaymentRate = 0.2;
const opportunityCostRate = 0.05;
const mortgageRate = 0.07;

const HOUSE_PRICE = 400_000;

const TAX = HOUSE_PRICE * taxRate;
const REPAIR_COST = HOUSE_PRICE * repairRate;
const DOWN_PAYMENT = HOUSE_PRICE * downPaymentRate;
const OPPORTUNITY_COST = DOWN_PAYMENT * opportunityCostRate;
const COST_OF_DEBT = (HOUSE_PRICE - DOWN_PAYMENT) * mortgageRate;

const TRUE_COST_OF_OWNERSHIP =
	TAX + REPAIR_COST + OPPORTUNITY_COST + COST_OF_DEBT;

console.log(
	`True Cost of Ownership: $${Intl.NumberFormat().format(TRUE_COST_OF_OWNERSHIP)}`
);
console.log(
	`Monthly Cost of Ownership: $${Intl.NumberFormat().format(TRUE_COST_OF_OWNERSHIP / 12)}`
);
