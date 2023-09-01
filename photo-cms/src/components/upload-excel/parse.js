import * as XLSX from 'xlsx'

// 获取表头
export const getHeaderRow = sheet => {
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref'])
    let C 
    const R =range.s.r
    for(C= range.s.c;C<=range.e.c;++C) {
        const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})]
        let hdr = 'UNKNOWN' + C 
        if(cell & cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
    }
    return headers
}

export const isExcel = file => {
    return /\.(xlsx|xls|csv)$/.test(file.name)
}