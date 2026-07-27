import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@oss/ui/components/card";
import { ArrowDownRight, ChartNoAxesCombined, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Investing | Diego Ramos",
	description:
		"A simple, self-managed three-fund portfolio with a deliberate glide path.",
};

const funds = [
	{
		ticker: "VOO",
		name: "U.S. large-cap stocks",
		description:
			"Tracks the S&P 500, providing broad exposure to established U.S. companies and long-term growth potential.",
		accent: "bg-sky-500",
	},
	{
		ticker: "VEA",
		name: "International developed stocks",
		description:
			"Tracks developed markets outside the U.S. and Canada, spreading equity exposure across countries and regions.",
		accent: "bg-emerald-500",
	},
	{
		ticker: "BND",
		name: "U.S. investment-grade bonds",
		description:
			"Tracks a broad U.S. bond market index, adding income and stability as the portfolio becomes more defensive.",
		accent: "bg-amber-500",
	},
];

export default function Page() {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-8 p-6 sm:p-10">
			<header className="max-w-3xl space-y-4 py-4">
				<p className="font-medium text-muted-foreground text-sm uppercase">
					Personal investing policy
				</p>
				<h1 className="font-semibold text-4xl tracking-normal sm:text-5xl">
					A portfolio built to stay invested
				</h1>
				<p className="text-lg text-muted-foreground leading-8">
					A three-fund portfolio that keeps the decisions simple: own the global
					stock market, add bonds deliberately, and let a consistent savings
					rate do the heavy lifting.
				</p>
			</header>

			<section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
				<Card className="border-foreground/15">
					<CardHeader>
						<CardTitle>The approach</CardTitle>
						<CardDescription>
							A self-managed target retirement fund, with control over the glide
							path.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4 text-muted-foreground leading-7">
						<p>
							The portfolio uses VOO, VEA, and BND to cover U.S. stocks,
							international developed stocks, and investment-grade bonds. The
							mix will shift gradually toward bonds over time, but does not need
							constant attention.
						</p>
						<p>
							Unlike an off-the-shelf target retirement fund, the stock-to-bond
							transition can reflect a personal appetite for risk. That makes
							room for a more growth-oriented allocation early on while keeping
							the process disciplined.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-muted/35">
					<CardHeader>
						<ChartNoAxesCombined aria-hidden="true" className="size-5" />
						<CardTitle>Decision cadence</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3 text-muted-foreground leading-7">
						<p className="font-semibold text-3xl text-foreground">
							Once a year
						</p>
						<p>
							Review the allocation, rebalance only when needed, then return
							focus to saving and living.
						</p>
					</CardContent>
				</Card>
			</section>

			<section aria-labelledby="funds-title" className="space-y-4">
				<div className="flex flex-wrap items-end justify-between gap-3">
					<div className="space-y-1">
						<p className="font-medium text-muted-foreground text-sm uppercase">
							The three funds
						</p>
						<h2 className="font-semibold text-2xl" id="funds-title">
							Broad coverage, few moving parts
						</h2>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{funds.map((fund) => (
						<Card key={fund.ticker}>
							<CardHeader className="space-y-4">
								<div className="flex items-center gap-3">
									<span className={`size-2.5 rounded-full ${fund.accent}`} />
									<span className="font-mono font-semibold text-lg">
										${fund.ticker}
									</span>
								</div>
								<CardTitle className="text-lg">{fund.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm leading-6">
									{fund.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<ArrowDownRight aria-hidden="true" className="size-5" />
							<CardTitle>The glide path</CardTitle>
						</div>
						<CardDescription>
							Begin fully invested in stocks when time is on your side; add
							stability as the need for the money gets closer.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-5">
						<div className="space-y-2">
							<div className="flex justify-between font-medium text-sm">
								<span>Earlier years</span>
								<span className="text-muted-foreground">100% stocks</span>
							</div>
							<div className="flex h-3 overflow-hidden rounded-full bg-muted">
								<div className="w-[65%] bg-sky-500" />
								<div className="w-[35%] bg-emerald-500" />
							</div>
						</div>
						<div className="space-y-2">
							<div className="flex justify-between font-medium text-sm">
								<span>Later years</span>
								<span className="text-muted-foreground">Stability-led</span>
							</div>
							<div className="flex h-3 overflow-hidden rounded-full bg-muted">
								<div className="w-[30%] bg-sky-500" />
								<div className="w-[20%] bg-emerald-500" />
								<div className="w-[50%] bg-amber-500" />
							</div>
						</div>
						<p className="text-muted-foreground text-sm leading-6">
							Start with no bonds only when the investing timeline is long.
							Someone starting later in life needs a different allocation. A
							future glide-path planner will turn a personal risk preference and
							timeline into yearly targets.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<ShieldCheck aria-hidden="true" className="size-5" />
							<CardTitle>What matters most</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 text-muted-foreground leading-7">
						<p>
							Savings rate has more influence than trying to optimize every
							point of return. Automate contributions, make the annual review,
							and leave the portfolio alone between decisions.
						</p>
						<p>
							More complex strategies can wait until a sufficiently high net
							worth, such as $500,000, creates a real need to consider tax
							optimization or additional diversification.
						</p>
					</CardContent>
				</Card>
			</section>

			<section className="mx-auto max-w-3xl space-y-5 py-4 text-muted-foreground leading-7">
				<h2 className="font-semibold text-2xl text-foreground">
					Why not Bitcoin or gold?
				</h2>
				<p>
					Bitcoin is intentionally outside this plan: its volatility and
					speculative nature make it a poor foundation for long-term financial
					goals. ETFs add expense ratios and liquidity constraints, while
					self-custody introduces security, tax, and access risks.
				</p>
				<p>
					Gold is also excluded. It does not generate income, provide a
					productive service, or innovate; it is not the engine of long-term
					growth this portfolio is designed to own.
				</p>
			</section>
		</div>
	);
}
