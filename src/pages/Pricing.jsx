import { motion } from "framer-motion";
import { FaCheck, FaStar } from "react-icons/fa";
import Header from '../components/Header';
import Footer from '../components/Footer';

const plans = [
  {
    name: "Free",
    price: "0",
    period: "pe lună",
    features: [
      "3 proiecte",
      "Template-uri de bază",
      "Export HTML/CSS",
      "Suport comunitate",
      "1GB stocare"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: "19",
    period: "pe lună",
    features: [
      "Proiecte nelimitate",
      "Template-uri premium",
      "Export + hosting",
      "Suport prioritar",
      "10GB stocare",
      "Domeniu custom",
      "Analytics integrate"
    ],
    popular: true
  },
  {
    name: "Team",
    price: "49",
    period: "pe lună",
    features: [
      "Tot din Pro",
      "Colaborare în echipă",
      "Brand kit personalizat",
      "API access",
      "100GB stocare",
      "White-label export",
      "Manager dedicat"
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Planuri Simple, Prețuri Transparente
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Alege planul perfect pentru nevoile tale. Upgrade sau downgrade oricând.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FaStar className="text-xs" />
                      Cel mai popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="text-4xl font-bold">{plan.price}€</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FaCheck className="text-green-500 text-sm" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.price === "0" ? "Începe Gratuit" : "Alege Planul"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}