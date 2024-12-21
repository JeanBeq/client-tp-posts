<template>
  <div>
    <NavBar />
    <div v-if="post" class="p-4">
      <h1 class="text-2xl font-bold">{{ post.title }} ({{ post.url }})</h1>
      <p class="text-gray-600">Par : {{ post.author }}</p>
      <div class="mt-4">
        <h2 class="text-xl font-bold">Commentaires</h2>
        <ul>
          <li v-for="comment in post.comments" :key="comment.id" class="mt-2">
            <p class="text-gray-800">{{ comment.author }}: {{ comment.comment }}</p>
          </li>
        </ul>
      </div>
      <div class="mt-4">
        <form @submit.prevent="addComment">
          <div class="mb-4">
            <label class="block text-gray-700">Autheur du commentaire</label>
            <input v-model="newComment.author" type="text" class="w-full px-3 py-2 border rounded" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Commentaire</label>
            <textarea v-model="newComment.comment" class="w-full px-3 py-2 border rounded" required></textarea>
          </div>
          <button type="submit" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Ajouter
          </button>
        </form>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
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
      post: null,
      newComment: {
        author: '',
        comment: ''
      }
    };
  },
  async mounted() {
    await this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const { data } = await this.$apollo.query({
        query: gql`
          query($id: ID!) {
            post(id: $id) {
              id
              author
              url
              title
              comments {
                id
                author
                comment
              }
            }
          }
        `,
        variables: {
          id: this.$route.params.id
        }
      });
      this.post = data.post;
    },
    async addComment() {
      const ADD_COMMENT = gql`
        mutation($postId: Int!, $author: String!, $comment: String!) {
          addComment(postId: $postId, author: $author, comment: $comment) {
            id
            author
            comment
            postId
          }
        }
      `;
      try {
        await this.$apollo.mutate({
          mutation: ADD_COMMENT,
          variables: {
            postId: parseInt(this.post.id, 10),
            author: this.newComment.author,
            comment: this.newComment.comment
          }
        });
        this.newComment.author = '';
        this.newComment.comment = '';
        this.fetchPost(); // Refetch the post to update the comments
        console.log(this.post); // Log the post data to verify comments are updated
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  }
};
</script>