/**
  1. 유저 프로필 페이지
  (1) 유저 프로필 페이지 구독하기, 구독취소
  (2) 구독자 정보 모달 보기
  (3) 유저 프로필 사진 변경
  (4) 사용자 정보 메뉴 열기 닫기
  (5) 사용자 정보(회원정보, 로그아웃, 닫기) 모달
  (6) 사용자 프로필 이미지 메뉴(사진업로드, 취소) 모달 
  (7) 구독자 정보 모달 닫기
 */

// (1) 유저 프로필 페이지 구독하기, 구독취소
function toggleSubscribe(toUserId, obj) {
	if ($(obj).text() === "구독취소") {
		
		$.ajax({
			type:"delete",
			url:"/api/subscribe/"+ toUserId,
			dataType:"json"
		}).done(res=>{
			$(obj).text("구독하기");
			$(obj).toggleClass("blue");
			
		}).fail(error=>{
			console.log("Unsubscription Failed!!!", error)
		});
		
	} else {
		
		$.ajax({
			type:"post",
			url:"/api/subscribe/"+ toUserId,
			dataType:"json"
		}).done(res=>{
			$(obj).text("구독취소");
			$(obj).toggleClass("blue");
			
		}).fail(error=>{
			console.log("Subscription Failed!!!", error)
		});
	}
}

// (2) 구독자 정보 모달 보기
function subscribeInfoModalOpen(pageUserId) {
	$(".modal-subscribe").css("display", "flex");
	
	$.ajax({
			url:`/api/user/${pageUserId}/subscribe`,
			dataType:"json"
		}).done(res=>{
			console.log(res)
			
			res.data.forEach((u)=>{
				let item = getSubscribeModalItem(u);
				$(".subscribe-list").append(item);
			});
			
		}).fail(error=>{
			console.log("subscription List Error!!!", error)
		});
}

function getSubscribeModalItem(u) {
	let item = `<div class="subscribe__item" id="subscribeModalItem-${u.id}">
		<div class="subscribe__img">
			<img src="/upload/${u.profileImageUrl}" onerror="this.src='/images/person.jpeg'"/>
		</div>
		<div class="subscribe__text">
			<h2>${u.username}</h2>
		</div>
		<div class="subscribe__btn">`;
	
	if(!u.equalUserState) {	// 동일사용자가 아닐 때 버튼 생성
		if(u.subscribeState){
			// 구독상태
			item += `<button class="cta blue" onclick="toggleSubscribe(${u.id}, this)">구독취소</button>`;
		}
		else {
			// 미구독상태
			item += `<button class="cta" onclick="toggleSubscribe(${u.id}, this)">구독하기</button>`;
		}
	}
			
	item +=`</div>
	</div>`;
	
	return item;
}

// (3) 유저 프로파일 사진 변경 (완)
function profileImageUpload(principalId) {
	
	$("#userProfileImageInput").click();

	$("#userProfileImageInput").off("change").on("change", (e) => {
		let f = e.target.files[0];

		if (!f.type.match("image.*")) {
			alert("이미지를 등록해야 합니다.");
			return;
		}
		
		let profileImageForm = $("#userProfileImageForm")[0];
		
		// formData 객체를 이용해 form태그의 필드와 그 값을 나타내는 일련의 key/value 쌍을 담을 수 있다.
		let formData = new FormData(profileImageForm);
		
		$.ajax({
			type:"put",
			url:`/api/user/${principalId}/profileImageUrl`,
			data:formData,
			contentType:false,	// 필수:x-www-form-urlencoded 로파싱되는 것을 방지
			processData:false,	// 필수:contentType을 false설정하면 QueryString 자동설정됨
			enctype:"multipart/form-data",
			dataType:"json"
			
		}).done(res=>{
			// 사진 전송 성공시 이미지 변경
			let reader = new FileReader();
			reader.onload = (e) => {
				$("#userProfileImage").attr("src", e.target.result);
			}
			reader.readAsDataURL(f); // 이 코드 실행시 reader.onload 실행됨.
			
			alert("프로필 사진이 변경되었습니다.");
			
		}).fail(error=>{
			alert("일시적인 오류로 프로필 사진이 변경에 실패하였습니다. 네트워크 상태를 확인하고 다시 시도해주세요.");
			console.log("Profile Image Change Failed!!!", error);
		});
	});
}


// (4) 사용자 정보 메뉴 열기 닫기
function popup(obj) {
	// TODO : 프로필사진 본인만 팝업 뜨도록 변경 필요
	$(obj).css("display", "flex");
}

function closePopup(obj) {
	$(obj).css("display", "none");
}


// (5) 사용자 정보(회원정보, 로그아웃, 닫기) 모달
function modalInfo() {
	$(".modal-info").css("display", "none");
}

// (6) 사용자 프로필 이미지 메뉴(사진업로드, 취소) 모달
function modalImage() {
	$(".modal-image").css("display", "none");
}

// (7) 구독자 정보 모달 닫기
function modalClose() {
	$(".modal-subscribe").css("display", "none");
	location.reload();
}






