import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { AudienceCards } from "@/components/home/AudienceCards";
import { Specializations } from "@/components/home/Specializations";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AudienceCards />
      <Specializations />
    </Layout>
  );
};

export default Index;
