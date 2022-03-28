<template>
  <div
    id="home"
    class="flex flex-col items-center justify-center text-center h-screen w-full"
  >
    <canvas id="c"></canvas>
    <div class="wrap py-2 px-4">
      <h1 class="text-5xl">Andrew Westwick</h1>
      <div class="links">
        <a href="https://www.linkedin.com/in/westwick/" target="_blank"
          >linkedin</a
        >
        .
        <a href="https://twitter.com/andrew_westwick" target="_blank"
          >twitter</a
        >
        .
        <a href="https://github.com/westwick" target="_blank">github</a>
      </div>
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
  background: rgb(17, 18, 30);
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
.wrap {
  /* background: rgba(0, 0, 0, 0.8); */
  backdrop-filter: blur(2px);
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
