// 样式表
const cssString = 'html{font-size:100px;}*{padding:0;margin:0;}.Chef_opacity{display:block;background:rgba(0,0,0,0.4);position:fixed;top:0;z-index:99;}.Chef_alert{position:fixed;top:100px;background:white;border-top:3px solid #FF6636;width:260px;padding-bottom:5px;left:50%;margin-left:-130px;z-index:100;font-family:Microsoft YaHei;}.Chef_alert>h2{width:90%;margin:10px auto;margin-bottom:0;font-size:18px;}.Chef_alert>p{width:90%;margin:0 auto;padding:25px 0;border-bottom:1px solid #d8d8d8;}.Chef_alert>div{width:90%;height:60px;margin:0 auto;font-size:0;text-align: center;}.Chef_alert>div>button{width:50%;height:100%;border:0;outline:0;font-size:18px;color:#FE651F;background:white;font-family:Microsoft YaHei;cursor:pointer;}.Chef_X{float:right;font-size:13px;color:grey;cursor:pointer;font-weight:normal;}';

/**
 * 自定义弹窗
 * @param {} isComfirm 0|1 0:comFirmMsg,1:alertMsg
 * @param {} comFirmMsg 确定||取消
 * @param {} alertMsg 确定
 */
export var messagePromptBox = {
    // 创建样式表
    cssStyle: () => {
        let doc = document;
        let style = doc.createElement('style');
        if (style.styleSheet) { // IE
            style.styleSheet.cssText = arguments[0];
        } else { // w3c
            let cssText = doc.createTextNode(arguments[0]);
            style.appendChild(cssText);
        }
        let heads = doc.getElementsByTagName('head');
        if (heads.length) {
            heads[0].appendChild(style);
        } else {
            doc.documentElement.appendChild(style);
        }
    },
    // 确认|取消
    comFirmMsg: (isComfirm, param) => {
        // 选择加载样式
        messagePromptBox.cssStyle(cssString);
        if (isComfirm === 0) {
            // comFirmMsg提示
            if (!param) {
                param = {
                    tips: 'comFirmMsg提示',
                    btnOk: '确定',
                    btnNo: '取消',
                    funcOk: () => {},
                    funcNo: () => {}
                };
            }
        } else if (isComfirm === 1) {
            // alertMsg 提示
            if (!param) {
                param = {
                    tips: 'alertMsg提示',
                    btnOk: '确定',
                    funcOk: () => {}
                };
            }
        }
        // 容器
        let tipWinObj = document.createElement('DIV');
        tipWinObj.id = 'MsgBox';
        tipWinObj.style.cssText = 'position:fixed;z-index:9999;width:3rem; height:auto; overflow:hidden;background-color:white; border:solid 1px #231234;top:50%;left:50%;margin-top:-30%;margin-left:-1.5rem;border-radius: 5px;transition: all .2s 0s ease-in-out;transform: scale(.8); opacity:0;';
        let clearDiv = document.createElement('DIV');
        clearDiv.style.cssText = 'clear:both';
        // 文本
        let contentDiv = document.createElement('DIV');
        contentDiv.style.cssText = 'height:auto; overflow:hidden; line-height:.24rem;padding:.1rem;text-align:center;margin:.1rem 0;font-size:.16rem';
        contentDiv.innerHTML = param.tips;
        if (isComfirm === 0) {
            // 左按钮
            let okBtn = document.createElement('BUTTON');
            okBtn.style.cssText = 'float:left ;width: 50%; cursor: pointer;border: 0;border-top: 1px solid #000;background: none;display: inline-block;font-size: .16rem;height: 40px;line-height:40px';
            okBtn.innerHTML = param.btnOk;
            // 右按钮
            let noBtn = document.createElement('BUTTON');
            noBtn.style.cssText = 'float: right;width: 50%; cursor: pointer;border: 0;border-top: 1px solid #000;border-left: 1px solid #000;background: none;display: inline-block;font-size: .16rem;height: 40px;line-height:40px';
            noBtn.innerHTML = param.btnNo;
            // 添加到容器
            tipWinObj.appendChild(contentDiv);
            tipWinObj.appendChild(noBtn);
            tipWinObj.appendChild(okBtn);
            // 获取当前页面的第一个body节点对象,
            let body = document.getElementsByTagName('BODY')[0];
            body.appendChild(tipWinObj);
            // 背景DIV
            let bgObj = document.createElement('DIV');
            bgObj.style.cssText = 'position:fixed;z-index: 9997;top: 0px;left: 0px;background: #000000;filter: alpha(Opacity=30); -moz-opacity:0.30;opacity:0.30;';
            bgObj.style.width = '100%';
            bgObj.style.height = '100%';
            body.appendChild(bgObj);
            // 开启动画
            messagePromptBox.openLoding(tipWinObj);
            okBtn.onclick = function() {
                param.funcOk();
                body.removeChild(tipWinObj);
                body.removeChild(bgObj);
            };
            noBtn.onclick = function() {
                param.funcNo();
                body.removeChild(tipWinObj);
                body.removeChild(bgObj);
            };
        } else {
            // 确定按钮
            let okBtn = document.createElement('BUTTON');
            okBtn.style.cssText = 'float:left ;width: 50%; cursor: pointer;border: 0;border-top: 1px solid #000;background: none;display: inline-block;font-size: .16rem;height: 40px;line-height:40px';
            okBtn.innerHTML = param.btnOk;
            // 添加到容器
            tipWinObj.appendChild(contentDiv);
            tipWinObj.appendChild(okBtn);
            // 获取当前页面的第一个body节点对象,
            let body = document.getElementsByTagName('BODY')[0];
            body.appendChild(tipWinObj);
            // 背景DIV
            let bgObj = document.createElement('DIV');
            bgObj.style.cssText = 'position:fixed;z-index: 9997;top: 0px;left: 0px;background: #000000;filter: alpha(Opacity=30); -moz-opacity:0.30;opacity:0.30;';
            bgObj.style.width = '100%';
            bgObj.style.height = '100%';
            body.appendChild(bgObj);
            // 开启动画
            messagePromptBox.openLoding(tipWinObj);
            okBtn.onclick = function() {
                param.funcOk();
                body.removeChild(tipWinObj);
                body.removeChild(bgObj);
            };
        }
    },

    /**
     * 弱提示
     * @param {} param.times 时间自动关闭
     * @param {} param.tips 提示信息
     * */
    tipMsgBox: (param) => {
        let times = param.times || 1500;
        let tipWinObj = document.createElement('DIV');
        tipWinObj.id = 'MsgBox';
        tipWinObj.style.cssText = 'position: fixed;z-index: 9999;width: 2rem;height: auto;overflow: hidden;top: 50%;left: 50%;margin-top: -30%;margin-left: -1rem;border-radius: 5px;color: #ffffff;background: rgba(0,0,0,1);transition: all .2s 0s ease-in-out;transform: scale(.8); opacity:0;';
        let clearDiv = document.createElement('DIV');
        clearDiv.style.cssText = 'clear:both';
        // 文本
        let contentDiv = document.createElement('DIV');
        contentDiv.style.cssText = 'height:auto; overflow:hidden; line-height:.24rem;padding:.1rem;text-align:center;margin:.1rem 0;font-size:.16rem';
        contentDiv.innerHTML = param.tips;
        // 添加到容器
        tipWinObj.appendChild(contentDiv);
        // 获取当前页面的第一个body节点对象,
        let body = document.getElementsByTagName('BODY')[0];
        body.appendChild(tipWinObj);
        // 开启动画
        messagePromptBox.openLoding(tipWinObj);
        // 定时关闭
        setTimeout(() => {
            body.removeChild(tipWinObj);
            tipWinObj.style.opacity = 0;
            tipWinObj.style.transform = 'scale(.8)';
        }, times);
    },
    // 开启动画
    openLoding: (tipWinObj) => {
        setTimeout(() => {
            tipWinObj.style.transform = 'scale(1)';
            tipWinObj.style.opacity = 1;
        }, 100);
    }
};