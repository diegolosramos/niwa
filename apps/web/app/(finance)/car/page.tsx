import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@oss/ui/components/card";
import { CarIntegrityChecklist } from "./car-integrity-checklist";

const ownershipCosts = [
	"Depreciation: the value the car loses while you own it.",
	"Insurance: premiums, deductibles, and the coverage you need before driving away.",
	"Maintenance and repairs: routine service, tires, and the unexpected work.",
	"Fuel: your annual mileage, efficiency, and local fuel price.",
	"Financing: interest and fees, not just the advertised monthly payment.",
	"Taxes and registration: the costs of making the car legal to drive.",
];

export default function Page() {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-8 p-6 sm:p-10">
			<header className="max-w-3xl space-y-4 py-4">
				<p className="font-medium text-muted-foreground text-sm uppercase">
					Practical car buying
				</p>
				<h1 className="font-semibold text-4xl tracking-normal sm:text-5xl">
					How to buy a car without buying a financial problem
				</h1>
				<p className="text-lg text-muted-foreground leading-8">
					A car should fit the life you have, not borrow from the life you want.
					Use this guide to set a spending limit, evaluate the total cost, and
					inspect a used car before money changes hands.
				</p>
			</header>

			<Card>
				<CardHeader>
					<CardTitle>Why a new car is not the option</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-muted-foreground leading-7">
					<p>
						The sharpest depreciation happens early, so a new-car buyer pays the
						largest price for the same transportation a careful used-car buyer
						can get later.
					</p>
					<p>
						Buy used, preferably with warranty coverage and a documented
						history. Let the first owner absorb the most expensive decline in
						value, then put your money toward an emergency fund, investing, or a
						shorter loan.
					</p>
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Set the ceiling first</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 text-muted-foreground leading-7">
						<p>
							Keep all monthly car costs at or below 10% of gross income.
							Include payment, insurance, fuel, maintenance, and registration
							savings.
						</p>
						<p>
							Keep the purchase price below 35% of gross annual income; closer
							to 20% is healthier. A lower number buys room for repairs and
							keeps the car from becoming your largest financial obligation
							after housing.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>The real cost of ownership</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-3 text-muted-foreground leading-6">
							{ownershipCosts.map((cost) => (
								<li key={cost}>{cost}</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Estimate fuel before you commit</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 text-muted-foreground leading-7">
						<p>
							Estimate annual fuel cost from your expected mileage, the car's
							real fuel economy, and current local fuel prices.
						</p>
						<p className="font-mono text-foreground text-sm">
							Fuel cost = (annual miles / miles per gallon) x fuel price
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Finance and insure before shopping</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3 text-muted-foreground leading-7">
						<p>
							Get a bank or credit-union pre-approval before visiting a dealer.
							Compare the APR, term, down payment, fees, and total paid, rather
							than negotiating from the monthly payment alone.
						</p>
						<p>
							When you are close to a purchase, request multiple insurance
							quotes so coverage is in place before you take possession.
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle id="integrity-checklist-title">
						Car integrity checklist
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-6 text-muted-foreground leading-7">
						Use this during the visit. Items marked Deal-breaker deserve a firm
						answer before you continue. For a private sale, ask why the car is
						being sold and what issues the seller knows about; pauses and vague
						answers are information too.
					</p>
					<CarIntegrityChecklist />
				</CardContent>
			</Card>

			<section className="mx-auto max-w-3xl space-y-5 py-4 text-muted-foreground leading-7">
				<h2 className="font-semibold text-2xl text-foreground">
					Close the deal deliberately
				</h2>
				<p>
					List every issue found during the inspection and test drive, then ask
					for the seller's price. Do not make the first offer or volunteer a
					number. Dealership negotiations are usually easier to manage in
					writing.
				</p>
				<p>
					For cash sales, meet in a safe public place such as a bank, count the
					money together, and get a receipt. Dealerships cost more but simplify
					paperwork and legal obligations. If a dealer offers truly favorable
					financing with no early-payment penalty, compare its total cost and
					consider paying it off early.
				</p>
			</section>
		</div>
	);
}
