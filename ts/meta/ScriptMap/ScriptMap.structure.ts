export type filetiem = {
    path : string,
    birthDate : string,
    data : string
}

export type mapItem = {
    path : string,
    directories : mapItem[]
    files : filetiem[],
}

//export type ScriptMap = mapItem[]