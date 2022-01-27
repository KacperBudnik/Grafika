txt="    const positions = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
];"

i=1
res=""

while i<length(txt)
    if(i+2<length(txt) && txt[i:i+3]=="-1.0")
    res*="-0.5"
    i+=3
    #print("\n")
    continue
    elseif (i+2<length(txt) && txt[i:i+2]=="1.0")
        res*=".5"
        i+=2
        continue
    end
    #print(txt[i])
    i+=1
    if txt[i:i]!="-"
        res*=txt[i]
    end
    end



i=1
res2=""

while i<length(res)
    i+=1
    if res[i-1]=='1'
        print(res[i-1])
        continue
    end
    res2*=res[i-1]
    end







    
    i=1
    res=""
    


    while i<length(txt)
        if(i+2<length(txt) && txt[i:i+2]=="1.0")
        res*="2/m"
        i+=2
        #print("\n")
        continue
        end
        #print(txt[i])
        i+=1
            res*=txt[i]
        end
    
    
i=1
res2=""

while i<length(res)
    i+=1
    if res[i-1]=='1'
        print(res[i-1])
        continue
    end
    res2*=res[i-1]
    end


