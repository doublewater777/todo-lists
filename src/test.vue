<template>
    <div>test</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        a: 1,
        b: 0,
      };
    },
    created() {
      // while (1) {
      //   console.log('123');
      // }
      this.a = a + 1;
    },
    watch: {
      a() {
        this.b++;
      },
      b() {
        this.a++;
      },
    },
  };
  </script>
  