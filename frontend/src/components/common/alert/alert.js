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
    // didOpen: () => { // TODO : 버튼 로딩인데 필요하신분 쓰세요
    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    // MySwal.showLoading()
    // },
})
}

export const LoginFail = () => {
    MySwal.fire({
        title: <p>로그인 실패! 사번과 비밀번호를 다시 확인하세요</p>,
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
