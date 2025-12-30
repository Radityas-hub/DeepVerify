const features = [
  {
    icon: "model_training",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-500/10",
    title: "CNN Architecture",
    description: "Convolutional Neural Network trained to detect patterns and artifacts in AI-generated images."
  },
  {
    icon: "speed",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-500/10",
    title: "Real-time Inference",
    description: "Optimized backend processing delivers results in milliseconds, not minutes."
  },
  {
    icon: "security",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-500/10",
    title: "Privacy First",
    description: "Images are processed in memory and immediately discarded after analysis."
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="bg-white backdrop-blur-sm p-6 rounded-xl border border-blue-100 flex flex-col gap-3 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-100 transition-all duration-300"
        >
          <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center ${feature.iconColor} mb-1`}>
            <span className="material-symbols-outlined">{feature.icon}</span>
          </div>
          <h4 className="text-slate-800 font-bold text-sm">
            {feature.title}
          </h4>
          <p className="text-slate-600 text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSection;
