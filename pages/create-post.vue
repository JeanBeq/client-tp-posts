<template>
  <div>
    <NavBar />
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Créer un post</h1>
        <form @submit.prevent="createPost">
          <div class="mb-4">
            <label for="author" class="block text-gray-700">Autheur</label>
            <input type="text" v-model="author" id="author" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div class="mb-4">
            <label for="title" class="block text-gray-700">Titre</label>
            <input type="text" v-model="title" id="title" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div class="mb-4">
            <label for="url" class="block text-gray-700">Lien de la news</label>
            <input type="text" v-model="url" id="url" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <button type="submit" class="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Create Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import NavBar from '~/components/Navbar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      author: '',
      url: '',
      title: ''
    };
  },
  methods: {
    async createPost() {
      const CREATE_POST = gql`
        mutation($author: String!, $url: String!, $title: String!) {
          createPost(author: $author, url: $url, title: $title) {
            id
            author
            url
            title
          }
        }
      `;
      await this.$apollo.mutate({
        mutation: CREATE_POST,
        variables: {
          author: this.author,
          url: this.url,
          title: this.title
        }
      });
      this.$router.push('/');
    }
  }
};
</script>