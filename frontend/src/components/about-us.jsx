import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AboutUs() {
  return (
    <div className="w-full">
      <section id="about-us" className="w-full py-8 md:py-16 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[600px]">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Us</h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                At Acme Inc., we are a team of passionate individuals dedicated to creating innovative solutions that
                empower our clients to achieve their goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-8 md:py-16 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Team</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Meet the talented individuals who make up the Acme Inc. team.
              </p>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div className="flex flex-col items-center justify-center space-y-4 rounded-full bg-background p-6 shadow-md">
                <Avatar className="h-16 w-16 rounded-full">
                  <AvatarImage src="/images/chainlink.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">John Doe</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-full bg-background p-6 shadow-md">
                <Avatar className="h-16 w-16 rounded-full">
                  <AvatarImage src="/images/chainlink.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Jane Smith</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-full bg-background p-6 shadow-md">
                <Avatar className="h-16 w-16 rounded-full">
                  <AvatarImage src="/images/chainlink.png" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Michael Johnson</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-full bg-background p-6 shadow-md">
                <Avatar className="h-16 w-16 rounded-full">
                  <AvatarImage src="/images/chainlink.png" />
                  <AvatarFallback>SL</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Sarah Lee</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-full bg-background p-6 shadow-md">
                <Avatar className="h-16 w-16 rounded-full">
                  <AvatarImage src="/images/chainlink.png" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">David Kim</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
