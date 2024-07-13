import { Button } from "@/components/ui/button";

const PlatformButton = ({ platform, selectedPlatform, setPlatform, Icon, label }) => {
  return (
    <Button
      variant="ghost"
      className={`aspect-square rounded-lg p-2 ${selectedPlatform === platform ? 'bg-primary text-background hover:bg-gray-700 hover:text-black' : 'bg-muted hover:bg-gray-300'}`}
      onClick={() => setPlatform(platform)}
    >
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </Button>
  );
};

export default PlatformButton;
