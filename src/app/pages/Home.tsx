import { Link } from "react-router";
import { Shield, TrendingUp, Users, BarChart3, HandCoins, Umbrella, CircleDollarSign, Calculator} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import MistBackground from "../components/ui/mistbackground";
import Logo from "../../assets/credaxior-logo.svg";
import LogoMonochrome from "../../assets/credaxior-logo-monochrome.svg";



export default function Home() {
  const roles = [
    {
      title: "Admin Portal",
      description: "Oversee platform operations, manage user accounts, and ensure data security",
      icon: Shield,
      path: "/admin",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Lender Portal",
      description: "Create loan offers, track payments, and manage borrower interactions",
      icon: HandCoins,
      path: "/lender",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Borrower Portal",
      description: "Apply for loans, track payment schedules, and manage loan details",
      icon: Users,
      path: "/borrower",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Financial Portal",
      description: "Analyze loan data, assess risks, and generate financial reports",
      icon: BarChart3,
      path: "/analyst",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <div className="flex items-center justify-between items-center">
              <img src={Logo} alt="Credaxior Logo" className="h-15 w-auto mt-2"></img>
              <nav className="font-roboto flex items-center gap-8">
                <Link to="/admin" className="text-[#8516cb] font-bold text-xl hover:opacity-50 transition">
                  ADMIN
                </Link>

                <Link to="/borrower" className="text-[#8516cb] font-bold text-xl hover:opacity-50 transition">
                  BORROWER
                </Link>

                <Link to="/lender" className="text-[#8516cb] font-bold text-xl hover:opacity-50 transition">
                   LENDER
                </Link>

                <Link to="/analyst" className="text-[#8516cb] font-bold text-xl hover:opacity-50 transition">
                   ANALYST
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>


      {/* Hero Section Wrapper */}
      <div className="bg-neutral-100 pt-5 pb-2">
        <div className="mx-auto max-w-7xl px-4">

          {/* Hero Card */}
          <div className="relative overflow-hidden rounded-2xl min-h-[520px] shadow-xl">

            {/* Mist Background (CLIPPED) */}
            <MistBackground />

            {/* Optional soft overlay for readability */}
            <div className="absolute inset-0 bg-black/10 z-[1]" />

            {/* Content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-16 text-white">

              {/* Left */}
              <div>
                

                <h2 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05] sm:leading-tight lg:leading-[1.0] font-normal mb-6">
                  Streamline Your Loan Process
                </h2>

                <p className="text-xl max-w-xl mt-20 text-white">
                  Track payments, calculate interest, and manage transaction records with ease.
                  A truly integrated platform for borrowers and lenders.
                </p>

                
              </div>

            

            </div>
          </div>
        </div>
      </div>

      {/* Role Section */}
      <div className="bg-gray-100 py-25 pb-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* Big Enclosing Box */}
          <div className="bg-white rounded-3xl shadow-lg p-16">

            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
                Choose Your Role
              </h2>
              <p className="text-gray-400 text-lg">
                Select your dashboard to get started
              </p>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {roles.map((role) => {
                const Icon = role.icon;

                return (
                  <div key={role.path} className="relative group border border-gray-100 rounded-2xl p-10 bg-white overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">

                    {/* Gradient Sweep Overlay */}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#8516cb]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-in-out"/>

                    {/* Icon */}
                    <div
                      className={`relative z-10 w-14 h-14 rounded-xl ${role.bgColor} flex items-center justify-center mb-6`}
                    >
                      <Icon className={`w-7 h-7 ${role.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl font-semibold text-gray-900 mb-3">
                      {role.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-gray-600 mb-8 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Button */}
                    <Link to={role.path} className="relative z-10 w-full py-3 bg-black text-white rounded-full hover:opacity-90 transition cursor-pointer text-center block">
                      Access Dashboard
                   </Link>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 pb-10 pt-2">
        <div className="max-w-7xl mx-auto px-4">
          {/* Big Enclosing Box */}
          <div className="bg-white rounded-3xl shadow-lg p-20">
           <div className="text-center mb-15">
             <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-20 ">Key Features</h2>
           </div>
          

           <div className="grid grid-cols-1 md:grid-cols-3 gap-30">
             <div className="text-center">
               <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                 <CircleDollarSign className="w-8 h-8 text-blue-600" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Payment Tracking</h3>
               <p className="text-gray-600">Monitor all payments with detailed transaction history and automated reminders</p>
             </div>

             <div className="text-center">
               <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                 <Calculator className="w-8 h-8 text-purple-600" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Interest Calculation</h3>
               <p className="text-gray-600">Automatic interest computation with customizable rates and amortization schedules</p>
             </div>

             <div className="text-center">
               <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                 <Umbrella className="w-8 h-8 text-green-600" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
               <p className="text-gray-600">Advanced analytics to evaluate creditworthiness and manage portfolio risk</p>
             </div>
           </div>
          </div>
         </div>
       </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <div className="flex items-center justify-between items-center px-6">
           <img src={LogoMonochrome} alt="Credaxior Logo Monochrome" className="h-8 w-auto opacity-75"></img>
           <p className="flex justify-end">&copy; 2026 Credaxior. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
