<template>
    <bm-info-window :position="{lng: lng, lat: lat}" :title="title" :content="content" :show="show" @open="InfoWindowOpen" @close="InfoWindowClose">
      <p v-html="content"></p>
    </bm-info-window>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        content:{
            type:String,
            default:''
        },
        lng:{
            type:String,
            default:''
        },
        lat:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            show:true
        };
    },
    methods:{
        InfoWindowOpen(){
            if(this.title === '个人信息'){
                this.$emit('editCtr',true);
            }
        },
        InfoWindowClose(){
            if(this.title === '个人信息'){
                this.$emit('editCtr',false);
            }
        }
    }
};
</script>