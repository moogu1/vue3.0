<template>
  <div class="about">
    <h1>This is an about msg{{msg}}</h1>
    <h1>This is an about:88 {{about}}</h1>
    <h1>This is an message：6 {{message}}</h1>
    <h1>This is an hhs--- {{hhs}}</h1>
    <h1 @click="bian">This is an postId {{postId}}</h1>
  </div>
</template>
<script lang="ts">
import { Options,Vue } from 'vue-class-component';
import { defineComponent, ref, computed } from 'vue'

import * as cc from 'vue-class-component';
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import { watch,reactive,toRaw } from 'vue';
console.log(999,cc)
console.log(999,Options)
@Options({
  components: {
    HelloWorld,
  },
  computed:{
    ...mapGetters([
      'posts'
    ]),
    message(): string {
      // this.name will be typed
      return 'Hello, --' + this.msg
    }
  },
  // props: {
  //   msg: String
  // },
  watch: {
    // hh:{
    //   immediate:true,
    //   deep:true,
    //   handler(){
    //     console.log('hh变了');
        
    //   }
    // },
    postId(id: string) {
      this.fetchPost(id) // -> No errors
    }
  },
  methods:{
    fetchPost(postId: string) {
      console.log('变了',this.postId);
      this.msg='变了'+this.postId

    }
  },
  // setup(){
  //   console.log('setup',this);
    
  //   var hhs=ref(6)
  //   // watch(hh,()=>{
  //   //   console.log('hh变了');
  //   // },{deep:true,immediate:true,})
  //   return{
  //     hhs
  //   }
  // }
})
export default class About extends Vue {
  msg: string='msgggg'
  hh:any=5555
  about='6666about'
  postId:string='6'

  ss=function ss() {
    return 1
  }
  
  

  mounted(){
    this.gg();
    var ss=this.ss;

    
    // const foo = {}
    // const reactiveFoo = reactive(foo)
    // console.log(toRaw(reactiveFoo) === foo) // true

  }
  
  

  bian(){
    this.postId='6632b'
    console.log('bian');
  }
  // get message(): string {
  //   // this.name will be typed
  //   return 'Hello, ' + this.msg
  // }
  gg(){
    console.log('this.msg');
    console.log(this.msg);
    // var a='55';
    // this.hh=(<string>a).toString();
    this.hh=this.hh.toString().length;
    console.log('hh 类型',typeof this.hh,this.hh);
  }
  // fetchPost(postId: string) {
  //   console.log('变了',this.postId);
  //   this.msg='变了'+this.postId

  // }
}
var aa=defineComponent({
  setup(){
    console.log('setup',this);
    
    var hhs=ref(6)
    // watch(hh,()=>{
    //   console.log('hh变了');
    // },{deep:true,immediate:true,})
    return{
      hhs
    }
  }
})
</script>