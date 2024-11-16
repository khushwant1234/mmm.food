import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { getQuickMeals } from "@/app/recommandation_algo/getScore";

export async function AnimatedTestimonialsDemo() {
  const quickMeals = await getQuickMeals();

  const testimonials = quickMeals.slice(0, 5).map((meal, index) => ({
    quote: `Quick and easy meal that can be prepared in 30 minutes or less!`,
    name: meal,
    src: "/images/cookie.png"
  }));

  return <AnimatedTestimonials testimonials={testimonials} />;
}
