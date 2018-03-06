<template>
    <footer class="footer">
        <div class="container">
            <span class="text-muted">Created by <a href="http://jamesinglis.no">James Inglis</a></span>
            <span class="text-muted float-right">Source code available on <a href="#">GitHub</a></span>
        </div>
    </footer>
</template>

<script>
  export default {
    name: 'lc-footer',
  }
</script>

<style scoped>
    .footer {
        /*position: absolute;*/
        bottom: 0;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #f5f5f5;
    }
</style>
