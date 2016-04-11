/**
 * Created by PC on 2016/4/11.
 */
var Init = [8,5,3];
var states = [[8,5,3]];

//from,to为桶的序号.arr为当前各桶的容量
function restriction(arr, from, to) {
    if(from >= 0 && from < 3 && to >= 0 && to <= 3){
        if(from != to && arr[from] >0 && arr[to] < Init[to]){ //倒出水的桶不能为空，倒入水的桶不能外满
            return true;
        }
    }
    return false;
}

//倒水量的计算
function pourWater(arr, from, to) {
    var next = arr.slice();
    var pour_water = (Init[to] - arr[to]) > arr[from] ? arr[from] : (Init[to] - arr[to]);  //倒出的水量为【倒入桶的剩余容积，倒出的桶的水量】中较小的那个值
    next[from] -= pour_water;
    next[to] += pour_water;
    return next;
}

//检测新的状态是否已经出现过
function isStateExist(state){
    for(var i = 0; i < state.length; i++){
        if(state[0] == states[i][0] && state[1] == states[i][1] && state[2] == states[i][2]){
            return true;
        }
    }
    return false;
}

(function SearchState(states){
    var arr = states[states.length - 1];
    if(arr[0] == 4 && arr[1] == 4){  //找到正确解
        var out = '';
        states.forEach(function(e){
            out += e.join(',') + ' -> ';
        });
        console.log(out.substr(0, out.length-4));
    }

    for(var j = 0; j < 3; j++) {
        for(var i = 0; i < 3; i++){
            if(restriction(arr,i,j)) {
                var next = pourWater(arr,i,j);
                if(!isStateExist(next)) {  //找到新状态
                    states.push(next);
                    SearchState(states);
                    states.pop();
                }
            }
        }
    }
})(states);