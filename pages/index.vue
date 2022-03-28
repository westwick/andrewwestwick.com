<template>
  <div
    id="home"
    class="flex flex-col items-center justify-center text-center h-screen w-full"
  >
    <h1 class="text-5xl">Andrew Westwick</h1>
    <div class="links">
      <a href="https://www.linkedin.com/in/westwick/" target="_blank"
        >linkedin</a
      >
      .
      <a href="https://twitter.com/andrew_westwick" target="_blank">twitter</a>
      .
      <a href="https://github.com/westwick" target="_blank">github</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style>
body {
  background: #11121e;
  color: #fff;
  font-family: 'Heebo', sans-serif;
}
a {
  color: #1de47c;
  transition: all 0.4s ease-in-out;
}
a:hover {
  text-shadow: -1px 1px 8px rgba(255, 255, 204, 0.76),
    1px -1px 8px rgba(255, 255, 255, 0.719);
}
</style>
