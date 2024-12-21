<template>
  <div>
    <NavBar @fetchPosts="fetchPosts" />
    <div class="flex justify-end p-4">
      <NuxtLink to="/create-post" class="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600" @postCreated="fetchPosts('new')">Ajouter un post</NuxtLink>
    </div>
    <ul>
      <li v-for="post in posts" :key="post.id" class="my-2">
        <Question :post="post" @delete="deletePost" />
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Question from '~/components/Question.vue';
import NavBar from '~/components/Navbar.vue';

export default {
  components: {
    Question,
    NavBar
  },
  onMounted() {
    this.fetchPosts('new');
  },
  data() {
    return {
      posts: []
    };
  },
  apollo: {
    posts: {
      query: gql`
        query($order: String) {
          posts(order: $order) {
            id
            author
            url
            title
          }
        }
      `,
      variables() {
        return {
          order: 'new'
        };
      }
    }
  },
  methods: {
    async fetchPosts(order) {
      const { data } = await this.$apollo.query({
        query: gql`
          query($order: String) {
            posts(order: $order) {
              id
              author
              url
              title
            }
          }
        `,
        variables: {
          order
        }
      });
      this.posts = data.posts;
    },
    async deletePost(id) {
      const DELETE_POST = gql`
        mutation($id: ID!) {
          deletePost(id: $id)
        }
      `;
      await this.$apollo.mutate({
        mutation: DELETE_POST,
        variables: {
          id
        }
      });
      this.$router.push('/');
    }
  }
};
</script>