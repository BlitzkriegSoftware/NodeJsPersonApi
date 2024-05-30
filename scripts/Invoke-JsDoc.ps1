<#
    Make JSDOC Pages
#>

[string]$version = "1.0.0";
[string]$scriptFolder = $PSScriptRoot
[string]$rootPath = (get-item $scriptFolder ).parent.FullName

Set-Location $rootPath

$searchFor = "version";
[string]$searchResult = Select-String -Path '.\package.json' -SimpleMatch $searchFor
if(![string]::IsNullOrWhiteSpace($searchResult)) {
    [int]$index = $searchResult.lastIndexOf(':');
    if($index -ge 0) {
        $searchResult = $searchResult.Substring($index + 1).Trim();
        $version = $searchResult.Replace('"',"").Replace("'",'').Replace(',',"");
        $version = $version.Trim();
    }
}

Write-Output "Version: ${version} $(Get-Date -Format 'yyyyMMdd hh:mm:ss')"

jsdoc -c ./jsdoc.json ./package.json -R ./README.md

# make a Temp folder
[string]$tempPath = [System.IO.Path]::GetTempPath();
$tempPath = Join-Path -Path $tempPath -ChildPath 'jsdoc/'
if(-not [System.IO.Directory]::Exists($tempPath)) {
    New-Item -Path $tempPath -ItemType Directory -Force
} 

# Clean up docs/ folder
[string]$docPath = Join-Path -Path $rootPath -ChildPath "docs\nodejs_people_api\${version}";
if(-not [System.IO.Directory]::Exists($docPath)) {
    write-error "Can't find documentation: ${docPath}";
    return 1;
}

Copy-Item -Path $docPath -Destination $tempPath -Recurse -Force
$outPath = Join-Path -Path $rootPath -ChildPath "docs\";
Push-Location $outPath
    Get-ChildItem | Remove-Item -Recurse -Force 2>&1 | out-null
Pop-Location

$tempPath = Join-Path -Path $tempPath -ChildPath $version
Copy-Item -Path "${tempPath}\*" -Destination $outPath -Recurse -Force;

Write-Output "Documentation is in: ${outPath}"
return;