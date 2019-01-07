//用途：购物网站商品详情页面的缩略小图投投到大图上
//第一个参数为包裹ul的元素的id名，第二个参数为需要投影的元素的id名，第三个为缩略图元素所添加的class名
function show(searchId, bigImgId, addClassName){
	var mUl = document.querySelector("#" + searchId + " ul");
	var lis = mUl.querySelectorAll("li");
	var len = lis.length;
	var show = document.querySelector("#" + bigImgId);
	var changeSrc = null;
	//在父级元素中使用事件监听，减少DOM操作
	mUl.onmouseover = function(event){
		event = event || window.event;
		var t = event.target;
		//赋值给变量已方便后续的清除延时
		changeSrc = setTimeout(function(t){
			//只有当前节点为img时才触发
			if (t.tagName.toLowerCase() === "img") {
				show.src = t.src;
				for (let i = 0; i < lis.length; i++) {
					lis[i].className = "";
				}
				//当当前节点不为li时，使当前节点变为当前节点的父节点
				while(t.tagName.toLowerCase() !== "li"){
					t = t.parentNode;
				}
				//此处需要在css中写好on类的效果，通常效果为添加边框
				t.className = addClassName;
			}
			//第三个参数传递当前节点
		},300,t);
	}
	//清除延时
	mUl.onmouseout = function(event){
		var t = event.target;
		if (t.tagName.toLowerCase() === "img") {
			clearTimeout(changeSrc);
		}
	}
	
}

//鼠标滑入滑出导航栏时，导航块的反应，及抽屉式拉出二级菜单
function nav_mouse(searchId, liClass, addClassName){
	var lis = document.querySelectorAll("." + liClass);
    let len = lis.length;
    let childLis = null;
    for(let i = 0; i < len; i++){
        lis[i].onmouseover = function(){
            this.className = liClass + " " + addClassName;
            childLis = lis[i].querySelectorAll("li");
            for (let j = 0; j < childLis.length; j++) {
                childLis[j].style.top = childLis[j].clientHeight * (j + 1) + "px";
            }
        }
        lis[i].onmouseout = function(){
        	this.className = liClass;
        	childLis = lis[i].querySelectorAll("li");
            for (let j = 0; j < childLis.length; j++) {
                childLis[j].style.top = "0";
            }
		}
    }
}