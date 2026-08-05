import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import About from "./About";
import { motion } from "framer-motion";

import heroimg from "../../public/home.jpg";


import {
  pageVariants,
  staggerContainer,
  fadeLeft,
  fadeRight,
  buttonHover,
  floatAnimation,
  fadeUp,
  
} from "../animations";

function Home() {

return (

<motion.div
  variants={pageVariants}
  initial="hidden"
  animate="visible"
  className="overflow-x-hidden bg-linear-to-br from-[#F6F4FB] via-[#F4F2FD] to-[#FBEAF5] min-h-screen"
>

<section className="relative min-h-screen grid lg:grid-cols-2 items-center gap-10 px-6 lg:px-20 overflow-hidden pt-15 pb-15 ">

<div
className=" absolute bottom-0 left-0 w-100 h-100 rounded-full bg-pink-300/20 blur-[120px] "/>

{/* LEFT */}

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="relative z-10"
>

<motion.div
variants={fadeLeft}
whileHover={{
    scale:1.05
}}


className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-lg border border-purple-200 text-purple-700 font-semibold px-5 py-3 rounded-full shadow-sm mt-0 mb-8"
>

✨ Trusted by 10,000+ patients

</motion.div>

<motion.h1 className=" font-extrabold leading-none text-5xl lg:text-7xl bg-linear-to-r from-[#4F46E5] via-[#7C3AED] to-[#C026D3]
bg-clip-text text-transparent"
initial={{
    opacity:0,
    x:-60
}}
animate={{
    opacity:1,
    x:0
}}
transition={{
    duration:2,
    delay:.3

}}
>
Medical Sample <br/> Collection at <br/> Your Doorstep </motion.h1>

<motion.p className="mt-8 text-gray-600 leading-9 text-lg font-semibold font-stretch-150% max-w-xl  " variants={fadeLeft}>

Professional healthcare services delivered to your home.

Safe, convenient and reliable sample collection with certified professionals.

</motion.p>

<motion.div
className="
mt-10
flex
gap-4
flex-wrap
"
variants={fadeLeft}
>

<motion.button
whileHover={buttonHover.whileHover}
whileTap={buttonHover.whileTap}
className="
bg-linear-to-r
from-indigo-600
to-fuchsia-600
text-white
font-semibold
px-8
py-4
rounded-2xl
shadow-xl
shadow-purple-300
cursor-pointer
"
>

Book Collection Now →

</motion.button>



</motion.div>

</motion.div>

{/* RIGHT */}

<motion.div
variants={fadeRight}
className="relative flex justify-center items-center"
>


<div
className="
rounded-4xl
overflow-hidden
bg-white
p-2
shadow-[0_20px_60px_rgba(124,58,237,.20)]
max-w-162.5
"
>


<motion.img
src={heroimg}
alt="Hero"
className="w-full h-auto rounded-4xl"

whileHover={{
    scale:0.95,
    rotate:0.5
}}
transition={{
    duration:.4
}}

/>

</div>

{/* Floating */}

<motion.div
  
>

<p className="font-bold ml-1 text-green-500 ">

  ✓ Certified

</p>

<p className="text-gray-500">

Professionals

</p>

</motion.div>

<motion.div
className="absolute top-10 right-0 bg-white px-6 py-4 rounded-3xl shadow-xl "
animate={floatAnimation.animate}
  transition={floatAnimation.transition}
  whileHover={floatAnimation.whileHover}
>

<p className="font-bold text-purple-700">

⭐ 4.9 / 5

</p>

<p className="text-gray-500">

Patient Rating

</p>

</motion.div>

<div
className="
absolute
right-10
-bottom-2.5
bg-white
px-6
py-4
rounded-3xl
shadow-xl
"
>

<p className="font-bold text-pink-600">

50K+

</p>

<p className="text-gray-500">

Tests Done

</p>

</div>

</motion.div>

</section>

{/* Stats */}

<motion.div
className="grid md:grid-cols-3 gap-6 px-6 lg:px-20 pb-20 "

>

{

[
["10K+","Happy Patients"],
["50K+","Tests Completed"],
["4.9★","Average Rating"]

].map((item)=>(

<motion.div

key={item[0]}

className="
bg-white/80
backdrop-blur-lg
rounded-3xl
shadow-lg
p-8
text-center
"
variants={fadeUp}
initial="hidden"
whileInView="visible"
viewport={{
  once: true,
  amount: 0.3,
}}
whileHover={{
  y: -8,
  scale: 1.03,
}}
>

<h2
className="
text-4xl
font-bold
bg-linear-to-r
from-indigo-600
to-fuchsia-600
bg-clip-text
text-transparent
"
>

{item[0]}

</h2>

<p className="text-gray-500 mt-2">

{item[1]}

</p>

</motion.div>

))

}

</motion.div>

<HowItWorks/>
<About/>


<Footer/>

</motion.div>

)

}

export default Home;