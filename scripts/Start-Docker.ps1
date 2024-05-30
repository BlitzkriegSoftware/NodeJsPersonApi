[string]$scriptFolder = $PSScriptRoot
[string]$rootPath = (get-item $scriptFolder ).parent.FullName
Set-Location $rootPath

[int32]$port = 30083;
[string]$name = 'node_people_api';
[string]$imageName = "blitzkriegsoftware/${name}";
[string]$workDir = '/api'; # must match Dockerfile

try {
  Write-Output "`nCleanup Docker...`n"
  docker stop "${name}" 2>&1 | out-null
  docker rm "${name}" 2>&1 | out-null

  Write-Output "`nBuilding from ${rootPath}...`n"
  docker build --no-cache -t $imageName . 

  Write-Output "`nRunning ${name}`n"
  docker run `
    --name "${name}" `
    -e "NODE_ENV=development" `
    -e "API_PORT=${Port}" `
    -p "${Port}:${Port}" `
    -m "300M" `
    --memory-swap "1G" `
    -w "${workDir}" `
    -d `
    "${imageName}" 

  <#
  Write-Output "`nStarting Shell`n"
  docker exec `
    "${name}" `
    -it `
    -w "${workDir}" `
    '/bin/bash'
  #>
} 
finally {
 Set-Location $scriptFolder;
}