
const Spinner = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-8 h-8 border-2 border-luxury-border border-t-gold-500 rounded-full animate-spin" />
    <p className="font-body text-xs tracking-widest text-gray-500 uppercase">{text}</p>
  </div>
);

export default Spinner;
