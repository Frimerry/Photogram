/**
	2. 스토리 페이지
	(1) 스토리 로드하기
	(2) 스토리 스크롤 페이징하기
	(3) 좋아요, 좋아요 취소
	(4) 댓글쓰기
	(5) 댓글삭제
 */

// (1) 스토리 로드하기
let page = 0;

function storyLoad() {
	
	$.ajax({
		url:`/api/image?page=${page}`,
		dataType:"json"
		
	}).done(res=>{
		
		// TODO : 구독목록이 없는 경우의 추가적인 처리 필요
		console.log(res.data.totalElements)
		
		if(res.data.totalElements!= 0){
			res.data.content.forEach((image)=>{
				let storyItem = getStoryItem(image);
				$("#storyList").append(storyItem);
			});
		}
		else {
			alert("TEST:표시할 구독목록이 없습니다.");
		}
		
	}).fail(error=>{
		console.log(error);
	});

}

storyLoad();

function getStoryItem(image) {
	
	let item = `<div class="story-list__item">
		<div class="sl__item__header">
			<div>
				<img class="profile-image" src="/upload/${image.user.profileImageUrl}"
					onerror="this.src='/images/person.jpeg'" />
			</div>
			<div>${image.user.username}</div>
		</div>
	
		<div class="sl__item__img">
			<img src="/upload/${image.postImageUrl}" />
		</div>
	
		<div class="sl__item__contents">
			<div class="sl__item__contents__icon">
				<button>`;
				
				if(image.likeState){
					// 좋아요 상태
					item += `<i class="fas fa-heart active" id="storyLikeIcon-${image.id}" onclick="toggleLike(${image.id})"></i>`;
				}
				else{
					// 기본 상태
					item += `<i class="far fa-heart" id="storyLikeIcon-${image.id}" onclick="toggleLike(${image.id})"></i>`;
				}
			
			item +=`
				</button>
			</div>
	
			<span class="like"><b id="storyLikeCount-${image.id}">${image.likeCount} </b>likes</span>
	
			<div class="sl__item__contents__content">
				<p>${image.caption}</p>
			</div>
	
			<div id="storyCommentList-1">
	
				<div class="sl__item__contents__comment" id="storyCommentItem-1"">
					<p>
						<b>Lovely :</b> 부럽습니다.
					</p>
	
					<button>
						<i class="fas fa-times"></i>
					</button>
				</div>
			</div>
	
			<div class="sl__item__input">
				<input type="text" placeholder="댓글 달기..." id="storyCommentInput-1" />
				<button type="button" onClick="addComment()">게시</button>
			</div>
	
		</div>
	</div>`;
	
	return item;
}

// (2) 스토리 스크롤 페이징하기
$(window).scroll(() => {
	
	let checkPos = $(window).scrollTop() - ($(document).height() - $(window).height())
	
	if (checkPos < 10 && checkPos > -10) {
		page++;
		storyLoad();
	}
});


// (3) 좋아요, 좋아요 취소
function toggleLike(imageId) {
	
	let likeIcon = $(`#storyLikeIcon-${imageId}`);
	
	if (likeIcon.hasClass("far")) {
		// 기본 상태, 좋아요 실행
		$.ajax({
			type:"post",
			url:`/api/image/${imageId}/likes`,
			dataType:"json"
		}).done(res=>{
			
			let likeCountStr = $(`#storyLikeCount-${imageId}`).text();
			let likeCount = Number(likeCountStr) + 1;
			
			$(`#storyLikeCount-${imageId}`).text(likeCount);
			
			likeIcon.addClass("fas");
			likeIcon.addClass("active");
			likeIcon.removeClass("far");
			
		}).fail(error=>{
			console.log("Like Error", error);
			alert("일시적인 오류로 좋아요 실패. 네트워크 상태를 확인해주세요.");
		});
		
	} else {
		// 좋아요 상태, 좋아요 취소 실행
		$.ajax({
			type:"delete",
			url:`/api/image/${imageId}/unlikes`,
			dataType:"json"
			
		}).done(res=>{
			
			let likeCountStr = $(`#storyLikeCount-${imageId}`).text();
			let likeCount = Number(likeCountStr) - 1;
			
			$(`#storyLikeCount-${imageId}`).text(likeCount);
			
			likeIcon.removeClass("fas");
			likeIcon.removeClass("active");
			likeIcon.addClass("far");
			
		}).fail(error=>{
			console.log("Unlike Error", error);
			alert("일시적인 오류로 좋아요 취소 실패. 네트워크 상태를 확인해주세요.");
		});
		
		
	}
}

// (4) 댓글쓰기
function addComment() {

	let commentInput = $("#storyCommentInput-1");
	let commentList = $("#storyCommentList-1");

	let data = {
		content: commentInput.val()
	}

	if (data.content === "") {
		alert("댓글을 작성해주세요!");
		return;
	}

	let content = `
			  <div class="sl__item__contents__comment" id="storyCommentItem-2""> 
			    <p>
			      <b>GilDong :</b>
			      댓글 샘플입니다.
			    </p>
			    <button><i class="fas fa-times"></i></button>
			  </div>
	`;
	commentList.prepend(content);
	commentInput.val("");
}

// (5) 댓글 삭제
function deleteComment() {

}







