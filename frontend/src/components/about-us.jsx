import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AboutUs() {
  return (
    <div className="w-full">
      <section id="about-us" className="w-full py-8 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[600px]">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Us</h2>
              <p className="text-gray-900 text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Cukka is a platform designed to integrate cryptocurrency payments with social media interactions. It addresses the growing need for easy,
                secure, and user-friendly methods to send digital currencies across popular social platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-8 md:py-16 lg:py-20 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Team</h2>
              <p className="text-gray-900 max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Meet the developers who make up the Cukka team.
              </p>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-background p-8 shadow-md">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage src="/images/bertan.jpeg" />
                  <AvatarFallback>BK</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Bertan Kofon</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-background p-8 shadow-md">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage src="/images/kaan.jpeg" />
                  <AvatarFallback>KA</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Kaan Aydeniz</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-background p-8 shadow-md">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage src="/images/ege.jpeg" />
                  <AvatarFallback>EAB</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Ege Aybars Bozkurt</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-background p-8 shadow-md">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage src="/images/nasuh.jpeg" />
                  <AvatarFallback>ND</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Nasuh Dincer</h4>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-background p-8 shadow-md">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage src="/images/chainlink.png" />
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-semibold">Alpgiray Ozer</h4>
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
