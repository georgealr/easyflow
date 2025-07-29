import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
	{
		title: "AI Website Builder",
		desc: "Generate websites with AI",
		icon: "🤖",
	},
	{
		title: "Brizy Cloud",
		desc: "SaaS platform, hosted by us",
		icon: "☁️",
	},
	{
		title: "Cloud Shops",
		desc: "Build. Launch. Sell.",
		icon: "🛒",
	},
	{
		title: "Brizy Shopify",
		desc: "Shopify app for landing pages",
		icon: "🛍️",
	},
	{
		title: "Brizy WordPress",
		desc: "WP plugin, hosted by you",
		icon: "🖥️",
	},
];

export default function Header() {
	const [showProducts, setShowProducts] = useState(false);

	return (
		<header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
			<div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
				<Link to="/" className="flex items-center gap-2">
					<img src="/vite.svg" alt="EasyFlow" className="h-8" />
					<span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						EasyFlow
					</span>
				</Link>

				<nav className="hidden md:flex items-center gap-8">
					<div
						className="relative"
						onMouseEnter={() => setShowProducts(true)}
						onMouseLeave={() => setShowProducts(false)}
					>
						<button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition">
							Products
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						<AnimatePresence>
							{showProducts && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50"
								>
									{products.map((item, idx) => (
										<div
											key={item.title}
											className="flex items-start gap-4 px-4 py-3 rounded-xl cursor-pointer transition hover:bg-blue-50"
										>
											<span className="text-2xl mt-1">{item.icon}</span>
											<div>
												<div className="font-semibold text-gray-900">
													{item.title}
												</div>
												<div className="text-sm text-gray-600">
													{item.desc}
												</div>
											</div>
										</div>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					<Link
						to="/pricing"
						className="text-gray-700 hover:text-blue-600 font-medium transition"
					>
						Pricing
					</Link>
					<Link
						to="/templates"
						className="text-gray-700 hover:text-blue-600 font-medium transition"
					>
						Templates
					</Link>
					<Link
						to="/help"
						className="text-gray-700 hover:text-blue-600 font-medium transition"
					>
						Help
					</Link>
				</nav>

				<div className="flex items-center gap-4">
					<Link
						to="/login"
						className="text-gray-700 hover:text-blue-600 font-medium transition"
					>
						Log In
					</Link>
					<Link
						to="/editor"
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition shadow-lg"
					>
						Start Free
					</Link>
				</div>
			</div>
		</header>
	);
}