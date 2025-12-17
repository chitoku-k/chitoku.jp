group "default" {
    targets = ["historia"]
}

target "historia" {
    context = "."
    secret = [
        {
            type = "file"
            id = ".env"
            src = ".env"
        },
    ]
}
