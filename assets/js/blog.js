domready(function () {

  const app = new Vue({
    el: "#app",
    data: {
      posts: [],
      posts_visible: true,
      post_visible: false,
      post_data: ""
    },
    methods:{
      menu_overlay(){
        $(".header").toggleClass("nav-active");
        setTimeout(function(){
            $(".nav__content").toggleClass("display-none");
            $(".body").toggleClass("no_scroll");
        },800);
      },
      async load_page(page){
        const response_page = await fetch(page, {credentials: 'include'});
        const content_page = await response_page.text();
        this.post_data = content_page;
        this.posts_visible = false;
        this.post_visible = true;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // window.history.pushState({}, null, "/");
      },
      async load_posts(){
        const response = await fetch("posts.json", {credentials: 'include'});
        const content = await response.json();
        this.posts = content;
        this.post_visible = false;
        this.posts_visible = true;

        if($(".header").hasClass("nav-active"))
        {
          $(".header").toggleClass("nav-active");
          setTimeout(function(){
            $(".nav__content").toggleClass("display-none");
            $(".body").toggleClass("no_scroll");
          },800);
        }

        console.log(content);
      }
    },
    watch: {
      post_visible: function () {
        if (this.post_visible) {
          this.$nextTick(function() {
            Prism.highlightAll();
          });
        }
      }
    },
    mounted(){
      this.load_posts();
    }
  });
  
});
