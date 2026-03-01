import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogContent";

const Blogs = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Blog</span> & Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Educational content explaining SAR technology, deep learning concepts, 
              and the science behind our colorization approach.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {blogPosts.map((post, index) => (
                <Link to={`/blogs/${post.slug}`} key={index}>
                  <article className="glass rounded-2xl overflow-hidden card-hover group">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </div>
                          </div>
                          <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                        </div>
                        <div className="shrink-0 p-2 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
