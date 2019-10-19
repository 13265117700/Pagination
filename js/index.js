const PAGE = {
  data:{
    datas:[],
    total:98,
    pageSize:10,
    currentPage:0
  },
  init:function(){
    this.bind();
    this.setDatas();
    this.render()
  },

  bind:function(){
    $('.paging-middle-list').on('click','.paging-middle-item',this.panging)
    $('.paging-head-home').on('click',this.home);
    $('.paging-head-last').on('click',this.last);
    $('.paging-tail-next').on('click',this.next);
    $('.paging-tail-finally').on('click',this.finally);
    $('.paging-confirm').on('click',this.confirm)
  },

  setDatas:function(){
    let total = PAGE.data.total;
    let tmpArr = [];
    for(let i=0;i<total;i++){
      let arr = i+1
      tmpArr.push(arr)
    }
    PAGE.data.datas = tmpArr
  },

  render:function(){
    let datas = PAGE.data.datas;
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let currentPage = PAGE.data.currentPage;
    $('.paging-input').val(currentPage+1);
    let showData = datas.filter((item)=>{
      return item > pageSize*currentPage && item<=pageSize*currentPage+pageSize;
    })

    let number = Math.ceil(total/pageSize);
    let page = [];
    for(let a=0;a<number;a++){
      let tt = a+1
      page.push(tt)
    }

    let mainerItem = showData.map((data)=>{
      return `
      <div class="mainer-item">
        <img src="./img/index_img.png"  class="mainer-item-img">
        <div class="mainer-item-info">
          <span class="mainer-item-title">maoabc</span>
          <span class="mainer-item-text">
            的疯狂进攻好卡就是打开就哈萨克的会离开货币看见哈伦裤十多年了还是佛的卡了客户离开干啥
          </span>
          <span class="mainer-item-time">2015年11月23日</span>
        </div>
        <span class="mainer-item-number">${data}</span>
      </div>
      `
    }).join('');

    let pagingMiddle = page.map((data)=>{
      return `
      <a href="javascript:;" class="paging-middle-item" data-index="${data}">${data}</a>
      `
    }).join('');

    let allNumber = `
      <a href="javascript:;" class="paging-amount">共${number}页</a>
    `


    $('#page-mainer').html(mainerItem)
    $('.paging-middle-list').html(pagingMiddle)
    $('.paging-allnumber').html(allNumber)
  },

  panging:function(e){
    let pangingItem = e.target;
    let currentPage = pangingItem.dataset.index;
    PAGE.data.currentPage = currentPage-1;
    $('.paging-input').val(currentPage);
    PAGE.render();
  },

  home:function(){
    let currentPage = PAGE.data.currentPage
    PAGE.data.currentPage =0;
    $('.paging-input').val(currentPage+1);
    PAGE.render();
  },

  last:function(){
    let currentPage = PAGE.data.currentPage;
    PAGE.data.currentPage = currentPage-1;
    $('.paging-input').val(currentPage);
    if(currentPage<=0){
      alert('已经是第一页了')
      $('.paging-input').val(currentPage+1);
      return;
    }
    PAGE.render();
  },

  next:function(){
   let currentPage = PAGE.data.currentPage;
   let total = PAGE.data.total;
   let pageSize = PAGE.data.pageSize;
   let number = Math.ceil(total/pageSize);
   PAGE.data.currentPage = currentPage+1;
   $('.paging-input').val(currentPage+2);
   if(number<=currentPage+1){
     alert('已经到底了')
     $('.paging-input').val(currentPage+1);
     return;
   }
   PAGE.render();
  },
  
  finally:function(){
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let number = Math.ceil(total/pageSize);
    $('.paging-input').val(number);
    PAGE.data.currentPage = number-1;
    PAGE.render();
  },

  confirm:function(){
    let input = $('.paging-input').val();
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let currentPage = Math.ceil(total/pageSize);
    PAGE.data.currentPage = input-1;
    if(isNaN(input)){
      $('.paging-input').val('');
      alert('请输入数字')
      return
    }
    if(input<=0 || input>currentPage){
      $('.paging-input').val('');
      alert('请重新输入')
      return
    }
    PAGE.render();
  }
}
PAGE.init();