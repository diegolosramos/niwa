"use client";

import { Button } from "@oss/ui/components/button";
import { Checkbox } from "@oss/ui/components/checkbox";
import { Progress } from "@oss/ui/components/progress";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

type ChecklistItem = {
	id: string;
	label: string;
	dealBreaker?: boolean;
};

type ChecklistSection = {
	title: string;
	description?: string;
	items: ChecklistItem[];
};

const CHECKLIST_SECTIONS: ChecklistSection[] = [
	{
		title: "Research before you go",
		description:
			"Use KBB to establish a fair price range, then request a Carfax or AutoCheck report for ownership, accident, and maintenance history.",
		items: [
			{ id: "price-range", label: "Checked the car's fair price range" },
			{ id: "history-report", label: "Obtained a vehicle history report" },
			{ id: "reliability", label: "Researched reliability and common issues" },
			{ id: "warranty", label: "Checked remaining warranty and coverage" },
			{ id: "engine-issues", label: "Researched known engine issues" },
		],
	},
	{
		title: "Paperwork",
		items: [
			{
				id: "title",
				label: "Verified the title and seller's ownership",
				dealBreaker: true,
			},
		],
	},
	{
		title: "Engine",
		description:
			"Check the engine while it is cold when possible. Put cardboard beneath it, then let it run for 10 minutes to spot leaks.",
		items: [
			{ id: "cold-engine", label: "Confirmed whether the engine was warm" },
			{ id: "clean-engine", label: "Engine bay appears clean and undisturbed" },
			{
				id: "battery",
				label: "Battery terminals are clean and corrosion-free",
			},
			{ id: "belts", label: "Belts and hoses are in good condition" },
			{ id: "oil", label: "Checked the oil level and condition" },
			{ id: "start", label: "Car starts without struggling" },
			{
				id: "leaks",
				label: "No fluid leaks other than A/C condensation",
				dealBreaker: true,
			},
		],
	},
	{
		title: "Exterior",
		items: [
			{
				id: "body",
				label: "Checked body panels for dents, scratches, and rust",
			},
			{ id: "tires", label: "Tires have even tread wear and proper inflation" },
			{ id: "windows", label: "Windows have no cracks or damage" },
			{ id: "mirrors", label: "Mirrors have no cracks or damage" },
			{ id: "paint", label: "Paint has no inconsistent areas or damage" },
			{ id: "doors", label: "All doors open and close properly" },
			{ id: "gas-lid", label: "Gas tank lid opens and closes properly" },
			{ id: "trunk", label: "Trunk opens and closes properly" },
		],
	},
	{
		title: "Interior and controls",
		items: [
			{ id: "dash-lights", label: "No warning indicators remain lit" },
			{ id: "seats", label: "Seats are not torn or stained" },
			{ id: "dashboard", label: "Dashboard is in good condition" },
			{ id: "ac", label: "A/C functions properly" },
			{ id: "console", label: "Touchscreen console functions properly" },
			{ id: "buttons", label: "Buttons and switches function properly" },
			{ id: "lights", label: "Headlights, taillights, and signals function" },
			{ id: "windows-sunroof", label: "Windows and sunroof operate properly" },
			{ id: "bluetooth", label: "Bluetooth, USB ports, and speakers work" },
			{ id: "horn", label: "Horn, seatbelts, parking brake, and wipers work" },
		],
	},
	{
		title: "Test drive",
		description:
			"Drive for 30 to 60 minutes, including highway speed. Turn off the radio and keep conversation quiet so you can listen.",
		items: [
			{
				id: "acceleration",
				label: "Accelerates smoothly without unusual noises",
			},
			{ id: "steering", label: "Steering responds correctly without noise" },
			{
				id: "alignment",
				label: "Car tracks straight and steering wheel does not vibrate",
			},
			{
				id: "brakes",
				label: "Brakes respond correctly without pulling or noise",
			},
			{ id: "pedals", label: "Pedals feel sturdy and respond correctly" },
		],
	},
	{
		title: "Four-wheel drive, if applicable",
		items: [
			{
				id: "four-wheel-drive",
				label: "Four-wheel drive engages and disengages properly",
			},
			{
				id: "four-wheel-noise",
				label: "No unusual noise or vibration in four-wheel drive",
			},
			{ id: "clearance", label: "Clears a moderate obstacle without scraping" },
		],
	},
];

const TOTAL_ITEMS = CHECKLIST_SECTIONS.reduce(
	(total, section) => total + section.items.length,
	0
);

export function CarIntegrityChecklist() {
	const [checkedItems, setCheckedItems] = useState<Set<string>>(
		() => new Set()
	);
	const completedItems = checkedItems.size;
	const completion = Math.round((completedItems / TOTAL_ITEMS) * 100);

	function toggleItem(itemId: string, checked: boolean) {
		setCheckedItems((current) => {
			const next = new Set(current);
			if (checked) {
				next.add(itemId);
			} else {
				next.delete(itemId);
			}
			return next;
		});
	}

	return (
		<section aria-labelledby="integrity-checklist-title" className="space-y-5">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-1">
					<p className="font-medium text-muted-foreground text-sm">
						{completedItems} of {TOTAL_ITEMS} checks complete
					</p>
					<Progress aria-label="Checklist completion" value={completion} />
				</div>
				<Button
					aria-label="Reset checklist"
					onClick={() => setCheckedItems(new Set())}
					size="icon"
					title="Reset checklist"
					variant="outline"
				>
					<RotateCcw />
				</Button>
			</div>

			<div className="space-y-6">
				{CHECKLIST_SECTIONS.map((section) => (
					<fieldset className="space-y-3" key={section.title}>
						<legend className="font-semibold text-base">{section.title}</legend>
						{section.description ? (
							<p className="text-muted-foreground text-sm leading-6">
								{section.description}
							</p>
						) : null}
						<div className="space-y-3">
							{section.items.map((item) => (
								<label
									className="flex cursor-pointer items-start gap-3 text-sm leading-5"
									htmlFor={item.id}
									key={item.id}
								>
									<Checkbox
										checked={checkedItems.has(item.id)}
										id={item.id}
										onCheckedChange={(checked) =>
											toggleItem(item.id, checked === true)
										}
									/>
									<span>
										{item.label}
										{item.dealBreaker ? (
											<span className="ml-2 font-medium text-destructive">
												Deal-breaker
											</span>
										) : null}
									</span>
								</label>
							))}
						</div>
					</fieldset>
				))}
			</div>
		</section>
	);
}
