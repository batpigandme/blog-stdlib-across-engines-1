var names = ["ArrayBuffer","Uint8Array","Uint16Array","Uint32Array","Float64Array","Map","Symbol"];
for (var i=0;i<names.length;i++) print(names[i] + ": " + eval("typeof " + names[i]));
