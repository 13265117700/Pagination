const PAGE ={
  data:{
    datas:[],
    total:98,
    pageSize:10,
    currentPage:1
  },

  init:function(){
    this.setDatas()
    this.bind();
    this.render();
  },

  setDatas:function(){
    let total = PAGE.data.total;
    let tmpArr = [];
    for(i=0;i<total;i++){
      let arr = i+1;
      tmpArr.push(arr)
    }
    PAGE.data.datas = tmpArr;
  },

  bind:function(){
    $('.paging-head-home').on('click',this.home)
    $('.paging-head-last').on('click',this.last)
    $('.paging-middle-list').on('click','.paging-middle-item',this.paging)
    $('.paging-tail-next').on('click',this.next)
    $('.paging-tail-finally').on('click',this.finally)
    $('.paging-confirm').on('click',this.confirm)
  },

  render:function(){
    let datas = PAGE.data.datas;
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let currentPage = PAGE.data.currentPage-1;
    $('.paging-input').val(currentPage+1);
    let showDatas = datas.filter((item,index) =>{
      return item>pageSize*currentPage && item<=pageSize*currentPage+pageSize;
    })
    // console.log(showDatas)

    let number = Math.ceil(total/pageSize);
    let paging = [];
    for(a=0;a<number;a++){
      let page = a+1;
      paging.push(page)
    }
    // console.log(paging)

    let showDataStr = showDatas.map(item=>{
      return `
        <div class="mainer-item" data-index="${item}">
          <img src="./img/index_img.png"  class="mainer-item-img">
          <div class="mainer-item-info">
            <span class="mainer-item-title">maoabc</span>
            <span class="mainer-item-text">
              的疯狂进攻好卡就是打开就哈萨克的会离开货币看见哈伦裤十多年了还是佛的卡了客户离开干啥
            </span>
            <span class="mainer-item-time">2015年11月23日</span>
          </div>
          <span class="mainer-item-number">#${item}</span>
        </div>
      `
    }).join('');

    let Pagination = paging.map(index=>{
      return `
      <a href="javascript:;" class="paging-middle-item" data-id="${index}">${index}</a>
      `
    }).join('');

    let sum = `
      <a href="javascript:;" class="paging-amount">共${number}页</a>
    `

    $('#page-mainer').html(showDataStr);
    $('.paging-middle-list').html(Pagination);
    $('.paging-sum').html(sum);
  },

  home:function(){
    PAGE.data.currentPage = 1;
    PAGE.render();
  },
  
  last:function(){
    let currentPage = PAGE.data.currentPage;
     if(currentPage<=1){
      alert('已经是第一页了')
      return;
    }
    PAGE.data.currentPage = currentPage-1;
   
    PAGE.render();
  },

  paging:function(e){
    let index = $(this).data('id');
    // let pagingItem = e.target;
    // let index = pagingItem.dataset.id;
    PAGE.data.currentPage = index;
    PAGE.render();
  },

  next:function(){
    let currentPage = PAGE.data.currentPage;
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let number = Math.ceil(total/pageSize);
    if(currentPage>=number){
      alert('已经是最后一页了')
      return
    }
    PAGE.data.currentPage = currentPage+1;
    PAGE.render();
  },

  finally:function(){
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let number = Math.ceil(total/pageSize);
    PAGE.data.currentPage = number;
    PAGE.render()
  },

  confirm:function(){
    let input =  $('.paging-input').val()
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let currentPage = PAGE.data.currentPage;
    let number = Math.ceil(total/pageSize);
    PAGE.data.currentPage = input;
    if(isNaN(input)){
      alert('请输入数字')
      $('.paging-input').val(currentPage)
      return;
    }
    if(input<=0 || input>number){
      alert('请重新输入')
      $('.paging-input').val(currentPage)
      return;
    }
    PAGE.render()
  }
}
PAGE.init();