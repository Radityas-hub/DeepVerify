const features = [
  {
    icon: "model_training",
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    title: "ResNet-50 Architecture",
    description: "Utilizing deep residual learning for image recognition to distinguish synthetic artifacts."
  },
  {
    icon: "speed",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    title: "Real-time Inference",
    description: "Optimized backend processing delivers results in milliseconds, not minutes."
  },
  {
    icon: "security",
    iconColor: "text-blue-500",
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
          className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-700/50 flex flex-col gap-3"
        >
          <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center ${feature.iconColor} mb-1`}>
            <span className="material-symbols-outlined">{feature.icon}</span>
          </div>
          <h4 className="text-slate-900 dark:text-white font-bold text-sm">
            {feature.title}
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSection;
