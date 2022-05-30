<template>
  <HomePage />
</template>

<script>
//2.导入组件
import HomePage from './components/HomePage';

export default {
    components:{
        HomePage
    }
};
</script>

<style>
@import "./static/common.less";
html,body ,#root{
  height:100%;
  margin:0;
}
</style>
