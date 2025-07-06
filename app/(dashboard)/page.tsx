'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <main>
      <section className="py-20 bg-primary-dark-blue text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-heading font-bold text-primary-foreground tracking-tight sm:text-5xl md:text-6xl leading-tight mb-4">
                Create your own ESG report and calculate your
                <span className="block text-light-green-secondary">carbon footprint</span>
              </h1>
              <p className="mt-3 text-lg font-body text-primary-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                A non-financial reporting tool that makes it easy for you to meet European standards and your customers’ expectations.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link href="/sign-in" passHref>
                  <Button
                    size="lg"
                    className="text-lg rounded-full bg-primary-white text-primary-dark-blue hover:bg-gray-100 shadow-lg transition-colors duration-300 px-8 py-3 font-semibold"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-full">
                <Image
                  src="/images/Sustainly-hero.jpg"
                  alt="Sustainly Hero Visual"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover shadow-xl sustainly-image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary-white text-primary-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-primary-dark-blue text-center mb-12">Our solutions</h2>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-8 mb-16">
            <div className="lg:order-1 lg:w-1/2">
              <h3 className="text-2xl font-heading font-semibold text-primary-dark-blue mb-4">ESG report</h3>
              <p className="text-base font-body text-primary-black mb-4">
                We will help you create a report for your business partners, banks or regulators. The report can be set up according to VSME or GRI standards. At the same time, you will receive a plan for implementing ESG requirements, a calculated carbon footprint and draft guidelines for compliance with all regulations.
              </p>
              <p className="text-lg font-heading font-bold text-accent-green mb-6">2,000 EUR excl. VAT</p>
              <Link href="/learn-more-esg" passHref>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-sm font-semibold px-6 py-3">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 lg:mt-0 lg:order-2 lg:w-1/2 flex justify-center">
              <Image
                src="/images/ESG report.jpg"
                alt="ESG Report"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full max-w-md sustainly-image"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-8 mb-16">
            <div className="lg:order-2 lg:w-1/2">
              <h3 className="text-2xl font-heading font-semibold text-primary-dark-blue mb-4">Sustainability strategy</h3>
              <p className="text-base font-body text-primary-black mb-4">
                Our tool will create a tailored strategy according to your requirements and help you design the ideal action plan. We build the strategy on your company’s foundations such as ISO certifications or H&S and EMS standards. Additionally, you will find out where your competitors stand in ESG and what is good practice in a specific area of sustainability.
              </p>
              <p className="text-lg font-heading font-bold text-accent-green mb-6">800 EUR excl. VAT</p>
              <Link href="/learn-more-strategy" passHref>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-sm font-semibold px-6 py-3">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 lg:mt-0 lg:order-1 lg:w-1/2 flex justify-center">
              <Image
                src="/images/Sustainability strategy.jpg"
                alt="Sustainability Strategy"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full max-w-md sustainly-image"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
            <div className="lg:order-1 lg:w-1/2">
              <h3 className="text-2xl font-heading font-semibold text-primary-dark-blue mb-4">Carbon footprint</h3>
              <p className="text-base font-body text-primary-black mb-4">
                We will calculate your company’s carbon footprint for you according to an internationally recognised standard GHG protocol. The carbon footprint is the first step in the sustainability journey and is also information that is very important for multinational companies with environmental goals. And they may just be your clients.
              </p>
              <p className="text-lg font-heading font-bold text-accent-green mb-6">800 EUR excl. VAT</p>
              <Link href="/learn-more-carbon" passHref>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-sm font-semibold px-6 py-3">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 lg:mt-0 lg:order-2 lg:w-1/2 flex justify-center">
              <Image
                src="/images/Carbon footprint.jpg"
                alt="Carbon Footprint"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full max-w-md sustainly-image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary-white text-primary-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary-dark-blue sm:text-4xl">
                Get started with ESG reporting
              </h2>
              <p className="mt-3 max-w-3xl text-lg font-body text-primary-black">
                Book an appointment with us and we will introduce you to our product and show you how it can help your business. We will also answer any questions you may have about ESG reporting and sustainability.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <Link href="/view-code" passHref>
                <Button
                  size="lg"
                  className="text-lg rounded-full bg-accent-purple text-primary-dark-blue hover:bg-accent-purple/80 shadow-md transition-colors duration-300 px-6 py-3 font-semibold"
                >
                  Contact Us
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="mt-20 text-center text-muted-foreground text-sm py-8 bg-background">
        &copy; {new Date().getFullYear()} Sustainly. All rights reserved.
      </footer>
    </main>
  );
}
