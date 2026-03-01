import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getBlogBySlug, blogPosts } from "@/data/blogContent";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground" asChild>
            <Link to="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Link>
          </Button>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-up opacity-0 stagger-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
                <Tag className="h-3 w-3" />
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-up opacity-0 stagger-2">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground animate-fade-up opacity-0 stagger-3">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden glass animate-fade-up opacity-0 stagger-4">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
            {post.content.sections.map((section, index) => (
              <div key={index} className="mb-10">
                {section.heading && (
                  <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              {prevPost ? (
                <Link 
                  to={`/blogs/${prevPost.slug}`}
                  className="glass rounded-xl p-6 flex-1 card-hover group"
                >
                  <span className="text-xs text-muted-foreground mb-2 block">← Previous</span>
                  <span className="font-display font-semibold group-hover:text-primary transition-colors">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div className="flex-1" />}
              
              {nextPost ? (
                <Link 
                  to={`/blogs/${nextPost.slug}`}
                  className="glass rounded-xl p-6 flex-1 text-right card-hover group"
                >
                  <span className="text-xs text-muted-foreground mb-2 block">Next →</span>
                  <span className="font-display font-semibold group-hover:text-primary transition-colors">
                    {nextPost.title}
                  </span>
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Want to Learn More?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our research articles for in-depth technical analysis or check out 
              our about page to understand our methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" asChild>
                <Link to="/articles">Read Research Articles</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about">About Our Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
