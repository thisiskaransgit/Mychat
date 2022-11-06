<template>
  <div class="sidebar">
    <Navbar />
    <Search />
    <Chats />
  </div>
</template>

<script>
import Navbar from "./NavBar.vue";
import Chats from "./ChatComp.vue";
import Search from "./SearchBar.vue";

export default {
  // name: SideBar,
  components: {
    Navbar,
    Search,
    Chats,
  },
};
</script>
