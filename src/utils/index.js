export const process_json = (data) => {
    const outputColumns=[]
    for (const elem of data.head.vars) {
        outputColumns.push({'field':elem, 'title':displayName(elem)})
    }
    return outputColumns
}

export const process_json_data = data => {
    const outputResults = []
    for (const item of data.results.bindings) {
        let row={}
        for(const key in item) {
            row[key] = item[key].value
        }
        outputResults.push(row)
    }
    return outputResults
}



export const displayName = text => text.toLowerCase()
.split(' ')
.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
.join(' ')