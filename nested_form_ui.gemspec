$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "nested_form_ui/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "nested_form_ui"
  s.version     = NestedFormUi::VERSION
  s.authors     = ["Tomasz Bak"]
  s.email       = ["t.bak@selleo.com"]
  s.homepage    = "https://github.com/tb/nested_form_ui"
  s.summary     = "nested_form UI helpers (sortable list, sortable tabs)"

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.md"]
  s.test_files = Dir["spec/**/*"]

  s.add_dependency 'rails', '>= 3'
  s.add_dependency 'jquery-rails'
  s.add_dependency 'nested_form'
end
