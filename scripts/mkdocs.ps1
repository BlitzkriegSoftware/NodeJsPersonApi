<#
    Make documents
#>

[string]$version = "1.0.0";

# Generate documents
Push-Location ..
[string]$rootPath = [System.IO.Directory]::GetCurrentDirectory();

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

jsdoc -c ./jsdoc.json ./package.json -R ./README.md
Pop-Location

# make a Temp folder
[string]$tempPath = [System.IO.Path]::GetTempPath();
$tempPath = Join-Path -Path $tempPath -ChildPath 'jsdoc/'
if(-not [System.IO.Directory]::Exists($tempPath)) {
    New-Item -Path $tempPath -ItemType Directory -Force
} 

# Clean up out/ folder
[string]$docpath = Join-Path -Path $rootPath -ChildPath "out\nodejs_people_api\${version}";
if(-not [System.IO.Directory]::Exists($docpath)) {
    write-error "Can't find documentation: ${docpath}";
    return 1;
}

Push-Location $docpath
Copy-Item -Path . -Destination $tempPath -Recurse -Force
Pop-Location

$outpath = Join-Path -Path $rootPath -ChildPath "out\";
Push-Location $outpath
Get-ChildItem | Remove-Item -Recurse -Force 2>&1 | out-null
$tempPath = Join-Path -Path $tempPath -ChildPath $version
Copy-Item -Path "${tempPath}\*" -Destination $outpath -Recurse -Force;
Pop-Location

Write-Output "Documentation is in: ${outpath}"
return;