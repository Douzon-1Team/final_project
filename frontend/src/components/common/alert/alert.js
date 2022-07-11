import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React from "react";


const MySwal = withReactContent(Swal);

// TODO : icon 종류 -> success, error, info, warning
export const LoginSuccess = () => {
MySwal.fire({
    title: <p>로그인 성공!</p>,
    html: <i>ALL IN ONE</i>,
    icon: 'success',
    confirmButtonColor: '#00AAFF',
    // didOpen: () => {
    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    // MySwal.showLoading()
    // },
})
}

export const LoginFail = () => {
    MySwal.fire({
        title: <p>로그인 실패! 사번과 비밀번호를 다시 확인하세요.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const LogoutSuccess = () => {
    MySwal.fire({
        title: <p>로그아웃 되었습니다.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'success',
        confirmButtonColor: '#00AAFF',
    })
}

export const LogoutFail = () => {
    MySwal.fire({
        title: <p>로그아웃에 실패했습니다.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const PrivateAlert = () => {
    MySwal.fire({
        title: <p>로그인 후 이용해주십시오.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const ImgUploadFail = () => {
    MySwal.fire({
        title: <p>1mb 이하의 이미지만 업로드 가능합니다.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const ImgUploadSuccess = () => {
    MySwal.fire({
        title: <p>이미지 변경이 완료되었습니다.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'success',
        confirmButtonColor: '#00AAFF',
    })
}

export const FileTypeError = () => {
    MySwal.fire({
        title: <p>JPG, JPEG, PNG 파일만 업로드 가능합니다.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const MainCalendarError = () => {
    MySwal.fire({
        title: <p>시스템 에러입니다. 관리자에게 문의 해주세요.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const MainCalendarError2 = () => {
    MySwal.fire({
        title: <p>시스템 에러입니다. 관리자에게 문의 해주세요.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const DeptVacationError = () => {
    MySwal.fire({
        title: <p>시스템 에러입니다. 관리자에게 문의 해주세요.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const TimeSettingError = () => {
    MySwal.fire({
        title: <p>출근시간이 퇴근시간보다 늦어서는 안됩니다.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const PwdSuccess = () => {
    MySwal.fire(
      {
          title: <p>비밀번호 변경이 완료되었습니다.</p>,
          html: <i>ALL IN ONE</i>,
          icon: 'success',
          confirmButtonColor: '#00AAFF',
      })
}

export const PwdError = () => {
    MySwal.fire(
      {
          title: <p>비밀번호 변경에 실패했습니다.</p>,
          html: <i>ALL IN ONE</i>,
          icon: 'error',
          confirmButtonColor: '#00AAFF',
      })
}
export const PwdNotRight = () => {
    MySwal.fire(
      {
          title: <p>비밀번호를 올바르게 입력해주세요.</p>,
          html: <i>ALL IN ONE</i>,
          icon: 'error',
          confirmButtonColor: '#00AAFF',
      })
}
export const PwdNotCollect = () => {
    MySwal.fire(
      {
          title: <p>새 비밀번호가 일치하지 않습니다.</p>,
          html: <i>ALL IN ONE</i>,
          icon: 'error',
          confirmButtonColor: '#00AAFF',
      })
}

export const SettingSuccess = () => {
    MySwal.fire(
      {
          title: <p>성공적으로 반영되었습니다.</p>,
          html: <i>ALL IN ONE</i>,
          icon: 'success',
          confirmButtonColor: '#00AAFF',
      })
}

export const SettingError = () => {
    MySwal.fire({
        title: <p>변경에 실패했습니다.</p>,
        html: <i>ALL IN ONE</i>,
        icon: 'error',
        confirmButtonColor: '#00AAFF',
    })
}

export const ResignConfirm = (callback) => {
    MySwal.fire({
        title:'정말 퇴사자로 등록하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00AAFF',
        cancelButtonColor: 'red',
        confirmButtonText: '등록',
        cancelButtonText: '취소'
    }).then(result => {
        if(result.isConfirmed){
            Swal.fire(
                '성공',
                '퇴사자 등록이 완료되었습니다',
                'success'
            );
        }
        callback(result.isConfirmed);
    })
}

export const DeleteConfirm = (callback) => {
    MySwal.fire({
        title:'정말 해당 사원을 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00AAFF',
        cancelButtonColor: 'red',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
    }).then(result => {
        if(result.isConfirmed){
            Swal.fire(
                '성공',
                '사원 삭제 완료되었습니다',
                'success'
            )
        }
        callback(result.isConfirmed);
    })
}
